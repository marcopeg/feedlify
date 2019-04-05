"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitCommit = void 0;

var _exec = require("./exec");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const gitCommit =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (target) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'commit';
    const options = {
      cwd: target
    };
    yield (0, _exec.exec)('git add .', options);
    yield (0, _exec.exec)("git commit -m \"".concat(message, "\""), options);
  });

  return function gitCommit(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.gitCommit = gitCommit;