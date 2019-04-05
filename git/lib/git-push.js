"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitPush = void 0;

var _spawn = require("./spawn");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const gitPush =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (git, options) {
    const username = git.username,
          password = git.password,
          repository = git.repository,
          target = git.target,
          branch = git.branch;

    const cmdOptions = _objectSpread({}, options, {
      cwd: target
    });

    const cmd = ["git push", "https://".concat(username, ":").concat(password, "@github.com/").concat(repository, ".git"), branch].join(' ');
    return (0, _spawn.spawn)(cmd, cmdOptions);
  });

  return function gitPush(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.gitPush = gitPush;