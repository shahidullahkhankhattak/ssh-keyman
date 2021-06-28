const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const readline = require("readline");
const { options, consoleColors } = require("./constants");
const { delAndCopySync, delDirSync } = require("./extendFs");

const SSH_PATH = path.join(os.homedir(), ".ssh");
const KEYMAN_DIR_PATH = path.join(os.homedir(), ".sshkeyman");
const KEYMAN_PATH = path.join(KEYMAN_DIR_PATH, ".sshkeyman");
const KEYMAN_DEFAULT_ENV_PATH = path.join(KEYMAN_DIR_PATH, "default");
const IS_INITIALIZED = fs.existsSync(KEYMAN_DIR_PATH) ? true : false;
let KEYMAN_CONTENT = IS_INITIALIZED
  ? JSON.parse(fs.readFileSync(KEYMAN_PATH))
  : undefined;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) =>
  new Promise((resolve) => {
    rl.question(q, (a) => {
      resolve(a);
    });
  });

rl.on("close", () => {
  console.log("closed");
});

const logger = (type, message) => {
  if (Array.isArray(message)) {
    message = message.join(" ");
  }
  let color;
  switch (type) {
    case "success": {
      color = consoleColors.FgGreen;
      break;
    }
    case "error": {
      color = consoleColors.FgRed;
      break;
    }
    default: {
      color = consoleColors.FgWhite;
      break;
    }
  }
  console.log(color, message ? message : "");
};

const help = function () {
  logger(null, "\n");
  logger(null, "Usage : ssh-keyman <command>", "\n");
  logger(null, [
    "Where <command> is one of: ",
    options.map((op) => `-${op.option}`).join(", "),
    "\n",
  ]);
  logger(null, "Commands:");
  for (let option of options) {
    logger(null, option.help);
  }
  logger(null, "\n");
};

const init = function () {
  if (!fs.existsSync(KEYMAN_DIR_PATH)) {
    fs.mkdirSync(KEYMAN_DIR_PATH);
    logger("success", "Initialized ssh-keyman directory " + KEYMAN_DIR_PATH);
    fs.mkdirSync(KEYMAN_DEFAULT_ENV_PATH);
    fs.copySync(SSH_PATH, KEYMAN_DEFAULT_ENV_PATH);
    logger(
      "success",
      "Initialized default environment " + KEYMAN_DEFAULT_ENV_PATH
    );
    fs.writeFileSync(
      KEYMAN_PATH,
      JSON.stringify({ active: "default", available: ["default"] })
    );
    logger("success", "Activating 'default' environment");
    return;
  }
  logger("success", "ssh-keyman already initialized");
};

const create = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initilized \n");
    logger(null, [
      "Please initialize ssh-keyman using:",
      "\n",
      "ssh-keyman -i",
      "\n",
    ]);
    return;
  }
  if (!name) {
    name = await question("Enter name for the new enviroment: ");
  }
  let { active, available } = KEYMAN_CONTENT || {};
  const exist = fs.existsSync(path.join(KEYMAN_DIR_PATH, name));
  if (exist) {
    return logger("error", "An environment with similar name already eixsts");
  }
  if (active) {
    delAndCopySync(SSH_PATH, path.join(KEYMAN_DIR_PATH, active));
    logger("success", [`Saved current ssh config to ${active}`]);
    const NEW_ENV_PATH = path.join(KEYMAN_DIR_PATH, name);
    fs.mkdirSync(NEW_ENV_PATH);
    logger("success", [
      "Created directory for new environment : ",
      NEW_ENV_PATH,
    ]);
    const ans = await question(
      ` Do you want to switch to newly created environment (${name})? `
    );
    if (ans.toLowerCase() === "y") {
      available.push(name);
      fs.writeFileSync(
        KEYMAN_PATH,
        JSON.stringify({ active: name, available })
      );
      delDirSync(SSH_PATH);
      fs.mkdirSync(SSH_PATH);
      logger("success", [`Activated environment '${name}'`]);
    }
  }
};

const list = function () {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initilized \n");
    logger(null, [
      "Please initialize ssh-keyman using:",
      "\n",
      "ssh-keyman -i",
      "\n",
    ]);
    return;
  }
  logger(null, "\nAvailable environments:");
  if (KEYMAN_CONTENT) {
    const { active, available } = KEYMAN_CONTENT;
    available.forEach((env) => {
      if (env === active) {
        logger("success", `*${env}`);
      } else {
        logger(null, env);
      }
    });
  }
  logger(null);
};

const switchEnv = function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "ssh-keyman is not initilized \n");
    logger(null, [
      "Please initialize ssh-keyman using:",
      "\n",
      "ssh-keyman -i",
      "\n",
    ]);
    return;
  }
  if (KEYMAN_CONTENT) {
    const { active, available } = KEYMAN_CONTENT;
    const env = available.find((env) => env === name);
    if (env === active) {
      return logger(
        "error",
        `${name} is already selected as existing environment`
      );
    }

    delAndCopySync(SSH_PATH, path.join(KEYMAN_DIR_PATH, active));
    logger("success", [`Saved current ssh config to '${active}'`]);
    const NEW_ENV_PATH = path.join(KEYMAN_DIR_PATH, name);
    delAndCopySync(NEW_ENV_PATH, SSH_PATH);
    fs.writeFileSync(KEYMAN_PATH, JSON.stringify({ available, active: name }));
    logger("success", `Activated environment '${name}'`);
  }
};

const deleteEnv = function (name) {
  if (name === "default") {
    return logger("error", "Default environment cannot be deleted");
  }
  let { active, available } = KEYMAN_CONTENT || {};
  const exist = fs.existsSync(path.join(KEYMAN_DIR_PATH, name));
  if (active === name) {
    return logger(
      "error",
      "Cannot delete this envionment as it is currently active"
    );
  }
  if (exist && available.find((env) => env === name)) {
    available.splice(available.indexOf(name), 1);
    fs.rmdirSync(path.join(KEYMAN_DIR_PATH, name), { recursive: true });
    fs.writeFileSync(
      KEYMAN_PATH,
      JSON.stringify({ active, available: available })
    );
    return logger("success", `Successfully deleted environment '${name}'`);
  }
};

const version = function() {
  const package = require('../package.json');
  return logger(null, 'ssh-keyman version : ' + package.version);
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
