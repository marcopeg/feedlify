"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = void 0;

var _child_process = require("child_process");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const spawn = function spawn(cmd) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise((resolve, reject) => {
    const tokens = cmd.split(' ');

    const log = options.log,
          otherOptions = _objectWithoutProperties(options, ["log"]);

    let lastErrorMsg = '';
    const process = (0, _child_process.spawn)(tokens.shift(), tokens, otherOptions);

    if (log) {
      process.stdout.on('data', data => {
        log(data.toString().trim());
      });
    }

    process.stderr.on('data', data => {
      lastErrorMsg = data.toString().trim();
    });
    process.on('close', code => {
      if (code === 0) {
        resolve(code);
      } else {
        const error = new Error(lastErrorMsg);
        error.spawnCode = code;
        reject(error);
      }
    });
    process.on('error', err => {
      reject(err);
    });
  });
};

exports.spawn = spawn;