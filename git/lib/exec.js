"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exec = void 0;

var _child_process = require("child_process");

const exec = function exec(cmd) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise((resolve, reject) => {
    (0, _child_process.exec)(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(err));
        return;
      }

      resolve(stdout.toString());
    });
  });
};

exports.exec = exec;