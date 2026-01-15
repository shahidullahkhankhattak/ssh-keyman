const cliOptions = [
  ["i", "init", "  -i           Initialize keyman directory and default environment"],
  ["c", "create", "  -c [name]    Create new ssh environment (interactive if no name)"],
  ["s", "switch", "  -s [name]    Switch to another ssh environment (interactive if no name)"],
  ["d", "delete", "  -d [name]    Delete ssh environment (interactive if no name)"],
  ["ls", "list", "  -ls          List all environments"],
  ["h", "help", "  -h           Show help"],
  ["v", "version", "  -v           Show version"],
];

const options = [];

module.exports = {
  cliOptions,
  options,
};
