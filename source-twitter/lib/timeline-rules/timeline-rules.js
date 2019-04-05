"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyExcludeRules = void 0;
const rulesMap = {
  username: (tweet, rule) => rule.value.includes(tweet.screenName)
};

const getRuleFn = rule => rulesMap[rule.rule] || (() => false);

const applyExcludeRules = rules => tweet => !rules.some(rule => {
  try {
    return getRuleFn(rule)(tweet, rule);
  } catch (err) {
    return false;
  }
});

exports.applyExcludeRules = applyExcludeRules;