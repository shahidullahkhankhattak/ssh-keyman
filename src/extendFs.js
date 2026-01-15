const fs = require("fs-extra");
const path = require("path");

const delDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    fs.rmSync(pathName, { recursive: true, force: true });
  }
};

const delAndCopySync = (fromPath, toPath) => {
  delDirSync(toPath);
  fs.mkdirSync(toPath);
  fs.copySync(fromPath, toPath);
};

module.exports = {
  delDirSync,
  delAndCopySync,
};
