"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruleUsername = void 0;

const ruleUsername = (tweet, rule) => {
  if (typeof rule.value === 'string') {
    return [rule.value].includes(tweet.screenName);
  } else {
    return rule.value.includes(tweet.screenName);
  }
};

exports.ruleUsername = ruleUsername;