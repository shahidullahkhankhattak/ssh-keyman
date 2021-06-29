const commands = require("./commands");
const { cliOptions, options } = require("./constants");

const generateOption = function (option, name, help) {
  options.push({
    option,
    name,
    method: name,
    help,
  });
};

const generateOptions = function () {
  cliOptions.forEach((op) => generateOption(...op));
};

const init = function () {
  generateOptions();
};

const run = async function (args, name) {
  if (!args.length) {
    commands.help(options);
    return process.exit(0);
  }
  for (let arg of args) {
    const command = options.find((op) => op.name === arg || op.option === arg);
    if (!command) {
      commands.help(options);
      return process.exit(0);
    }
    const fn = commands[command.method];
    await fn(name);
  }
  process.exit();
};

const prepareArgs = function (argv) {
  return argv
    .slice(2, argv.length)
    .filter((arg) => arg.charAt(0) === "-")
    .map((arg) => arg.replace(/\-/g, ""));
};

const getName = function (argv) {
  return argv.slice(2).find((arg) => arg.charAt(0) !== "-");
};

module.exports = {
  prepareArgs,
  getName,
  init,
  run,
};
