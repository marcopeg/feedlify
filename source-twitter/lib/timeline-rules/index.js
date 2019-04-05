"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyExcludeRules = void 0;

var _ruleUsername = require("./rule-username");

const rulesMap = {
  username: _ruleUsername.ruleUsername
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