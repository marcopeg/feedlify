"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchTimeline = void 0;

var _scraper = require("./scraper");

var _timelineRules = require("./timeline-rules");

var _dataTypeTweet = require("./data-type-tweet");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fetchTimeline =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (config) {
    const source = config.source;
    const limit = config.limit || 20;
    const exclude = config.exclude || [];
    return (yield (0, _scraper.scrapeTimeline)(source, limit)).slice(0, limit).filter((0, _timelineRules.applyExcludeRules)(exclude)).map(_dataTypeTweet.tweetDataType);
  });

  return function fetchTimeline(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchTimeline = fetchTimeline;