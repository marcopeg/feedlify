"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = void 0;

var _spawn = require("./spawn");

const clone = function clone(git) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const username = git.username,
        password = git.password,
        repository = git.repository,
        branch = git.branch,
        target = git.target;
  const cmd = ["git clone", "--single-branch --branch ".concat(branch || 'master'), "https://".concat(username, ":").concat(password, "@github.com/").concat(repository, ".git"), target].join(' ');
  return (0, _spawn.spawn)(cmd, options);
};

exports.clone = clone;