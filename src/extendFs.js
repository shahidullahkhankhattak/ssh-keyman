const fs = require("fs-extra");
const path = require("path");

const delDirSync = (pathName) => {
  const content = fs.readdirSync(pathName);
  if (!content.length) {
    return fs.rmdirSync(pathName);
  }
  content.forEach((contentPath) => {
    const isDir = fs.lstatSync(path.join(pathName, contentPath)).isDirectory();
    if (isDir) delDirSync(path.join(pathName, contentPath));
    else fs.rmSync(path.join(pathName, contentPath));
  });
  fs.rmdirSync(pathName);
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
