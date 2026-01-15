const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
const { options } = require("./constants");
const { delAndCopySync, delDirSync } = require("./extendFs");

// Register autocomplete prompt
inquirer.registerPrompt("autocomplete", autocompletePrompt);

const SSH_PATH = path.join(os.homedir(), ".ssh");
const KEYMAN_DIR_PATH = path.join(os.homedir(), ".sshkeyman");
const KEYMAN_PATH = path.join(KEYMAN_DIR_PATH, ".sshkeyman");
const KEYMAN_DEFAULT_ENV_PATH = path.join(KEYMAN_DIR_PATH, "default");
const IS_INITIALIZED = fs.existsSync(KEYMAN_DIR_PATH) ? true : false;
let KEYMAN_CONTENT = IS_INITIALIZED
  ? JSON.parse(fs.readFileSync(KEYMAN_PATH))
  : undefined;

const logger = (type, message) => {
  if (Array.isArray(message)) {
    message = message.join(" ");
  }
  switch (type) {
    case "success":
      console.log(chalk.green(message ? message : ""));
      break;
    case "error":
      console.log(chalk.red(message ? message : ""));
      break;
    case "warning":
      console.log(chalk.yellow(message ? message : ""));
      break;
    case "info":
      console.log(chalk.cyan(message ? message : ""));
      break;
    default:
      console.log(message ? message : "");
      break;
  }
};

const help = function () {
  console.log();
  console.log(chalk.bold.cyan("SSH KeyMan") + chalk.gray(" - SSH Key Environment Manager"));
  console.log();
  console.log(chalk.bold("Usage:") + " ssh-keyman <command> [options]");
  console.log();
  console.log(chalk.bold("Commands:"));
  for (let option of options) {
    console.log(chalk.gray(option.help));
  }
  console.log();
  console.log(chalk.dim("Tip: Run commands without arguments for interactive mode"));
  console.log();
};

const init = function () {
  if (!fs.existsSync(KEYMAN_DIR_PATH)) {
    console.log(chalk.cyan("\n🔑 Initializing SSH KeyMan...\n"));
    fs.mkdirSync(KEYMAN_DIR_PATH);
    logger("success", "✓ Created ssh-keyman directory: " + KEYMAN_DIR_PATH);
    fs.mkdirSync(KEYMAN_DEFAULT_ENV_PATH);
    fs.copySync(SSH_PATH, KEYMAN_DEFAULT_ENV_PATH);
    logger("success", "✓ Created default environment");
    fs.writeFileSync(
      KEYMAN_PATH,
      JSON.stringify({ active: "default", available: ["default"] })
    );
    logger("success", "✓ Activated 'default' environment");
    console.log(chalk.green("\n✨ SSH KeyMan initialized successfully!\n"));
    return;
  }
  logger("info", "ssh-keyman is already initialized");
};

const create = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initialized\n");
    logger(null, "Please initialize ssh-keyman using: ssh-keyman -i\n");
    return;
  }
  if (!name) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "envName",
        message: "Enter name for the new environment:",
        validate: (input) => {
          if (!input || input.trim() === "") {
            return "Environment name cannot be empty";
          }
          if (fs.existsSync(path.join(KEYMAN_DIR_PATH, input))) {
            return "An environment with this name already exists";
          }
          return true;
        },
      },
    ]);
    name = answer.envName;
  }
  let { active, available } = KEYMAN_CONTENT || {};
  const exist = fs.existsSync(path.join(KEYMAN_DIR_PATH, name));
  if (exist) {
    return logger("error", "An environment with similar name already exists");
  }
  if (active) {
    delAndCopySync(SSH_PATH, path.join(KEYMAN_DIR_PATH, active));
    logger("success", `Saved current ssh config to ${active}`);
    const NEW_ENV_PATH = path.join(KEYMAN_DIR_PATH, name);
    fs.mkdirSync(NEW_ENV_PATH);
    logger("success", `Created directory for new environment: ${NEW_ENV_PATH}`);
    
    const { switchNow } = await inquirer.prompt([
      {
        type: "confirm",
        name: "switchNow",
        message: `Do you want to switch to newly created environment (${name})?`,
        default: true,
      },
    ]);
    
    available.push(name);
    if (switchNow) {
      fs.writeFileSync(
        KEYMAN_PATH,
        JSON.stringify({ active: name, available })
      );
      delDirSync(SSH_PATH);
      fs.mkdirSync(SSH_PATH);
      return logger("success", `Activated environment '${name}'`);
    }
    fs.writeFileSync(
      KEYMAN_PATH,
      JSON.stringify({ active: active, available })
    );
    return logger("success", `Successfully created environment ${name}`);
  }
};

const list = function () {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initialized\n");
    logger(null, "Please initialize ssh-keyman using: ssh-keyman -i\n");
    return;
  }
  console.log(chalk.bold("\nAvailable environments:"));
  if (KEYMAN_CONTENT) {
    const { active, available } = KEYMAN_CONTENT;
    available.forEach((env) => {
      if (env === active) {
        console.log(chalk.green(`  ✓ ${env}`) + chalk.gray(" (active)"));
      } else {
        console.log(chalk.white(`  • ${env}`));
      }
    });
  }
  console.log();
};

const switchEnv = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initialized\n");
    logger(null, "Please initialize ssh-keyman using: ssh-keyman -i\n");
    return;
  }
  if (KEYMAN_CONTENT) {
    const { active, available } = KEYMAN_CONTENT;
    
    // If no name provided, show interactive autocomplete menu
    if (!name) {
      const otherEnvs = available.filter((env) => env !== active);
      
      if (otherEnvs.length === 0) {
        return logger("warning", "No other environments available to switch to");
      }
      
      const answer = await inquirer.prompt([
        {
          type: "autocomplete",
          name: "envName",
          message: "Select environment to switch to:",
          source: async (answersSoFar, input) => {
            const filtered = otherEnvs.filter((env) =>
              env.toLowerCase().includes((input || "").toLowerCase())
            );
            return filtered.map((env) => ({
              name: env,
              value: env,
            }));
          },
          pageSize: 10,
        },
      ]);
      name = answer.envName;
    }
    
    const env = available.find((env) => env === name);
    
    if (!env) {
      return logger("error", `Environment '${name}' not found`);
    }
    
    if (env === active) {
      return logger("warning", `${name} is already the active environment`);
    }

    delAndCopySync(SSH_PATH, path.join(KEYMAN_DIR_PATH, active));
    logger("success", `Saved current ssh config to '${active}'`);
    const NEW_ENV_PATH = path.join(KEYMAN_DIR_PATH, name);
    delAndCopySync(NEW_ENV_PATH, SSH_PATH);
    fs.writeFileSync(KEYMAN_PATH, JSON.stringify({ available, active: name }));
    logger("success", `Activated environment '${name}'`);
  } else {
    logger("error", "Data directory is corrupt. Please try uninstalling and reinstalling the package.");
  }
};

const deleteEnv = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initialized\n");
    logger(null, "Please initialize ssh-keyman using: ssh-keyman -i\n");
    return;
  }
  
  let { active, available } = KEYMAN_CONTENT || {};
  
  // If no name provided, show interactive autocomplete menu
  if (!name) {
    const deletableEnvs = available.filter((env) => env !== "default" && env !== active);
    
    if (deletableEnvs.length === 0) {
      return logger("warning", "No environments available to delete");
    }
    
    const answer = await inquirer.prompt([
      {
        type: "autocomplete",
        name: "envName",
        message: "Select environment to delete:",
        source: async (answersSoFar, input) => {
          const filtered = deletableEnvs.filter((env) =>
            env.toLowerCase().includes((input || "").toLowerCase())
          );
          return filtered.map((env) => ({
            name: env,
            value: env,
          }));
        },
        pageSize: 10,
      },
    ]);
    name = answer.envName;
    
    // Confirm deletion
    const { confirmDelete } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmDelete",
        message: `Are you sure you want to delete environment '${name}'?`,
        default: false,
      },
    ]);
    
    if (!confirmDelete) {
      return logger("info", "Deletion cancelled");
    }
  }
  
  if (name === "default") {
    return logger("error", "Default environment cannot be deleted");
  }
  
  const exist = fs.existsSync(path.join(KEYMAN_DIR_PATH, name));
  if (active === name) {
    return logger(
      "error",
      "Cannot delete this environment as it is currently active"
    );
  }
  if (exist && available.find((env) => env === name)) {
    available.splice(available.indexOf(name), 1);
    fs.rmSync(path.join(KEYMAN_DIR_PATH, name), { recursive: true, force: true });
    fs.writeFileSync(
      KEYMAN_PATH,
      JSON.stringify({ active, available: available })
    );
    return logger("success", `Successfully deleted environment '${name}'`);
  } else {
    return logger("error", `Couldn't find environment '${name}'`);
  }
};

const version = function() {
  const pkg = require('../package.json');
  console.log(chalk.cyan('ssh-keyman') + chalk.gray(' version ') + chalk.bold(pkg.version));
}

module.exports = {
  version,
  list,
  init,
  help,
  create,
  switch: switchEnv,
  delete: deleteEnv,
};
