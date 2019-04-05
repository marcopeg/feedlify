"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHashtags = void 0;

var _hashtagRegex = _interopRequireDefault(require("hashtag-regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getHashtags = text => {
  const regex = (0, _hashtagRegex.default)();
  const matches = [];
  let match;

  while (match = regex.exec(text)) {
    matches.push(match[0].substr(1));
  }

  return matches;
};

exports.getHashtags = getHashtags;