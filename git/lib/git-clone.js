"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitClone = void 0;

var _spawn = require("./spawn");

const gitClone = (git, options) => {
  const username = git.username,
        password = git.password,
        repository = git.repository,
        target = git.target,
        branch = git.branch;
  const cmd = ["git clone", "--single-branch --branch ".concat(branch), "https://".concat(username, ":").concat(password, "@github.com/").concat(repository, ".git"), target].join(' ');
  return (0, _spawn.spawn)(cmd, options);
};

exports.gitClone = gitClone;