"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pull = void 0;

var _spawn = require("./spawn");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pull = (git, options) => {
  const target = git.target,
        branch = git.branch;
  const cmd = ["git pull", "origin ".concat(branch)].join(' ');
  return (0, _spawn.spawn)(cmd, _objectSpread({}, options, {
    cwd: target
  }));
};

exports.pull = pull;