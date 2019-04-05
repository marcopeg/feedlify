"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProfile = void 0;

var _scraper = require("./scraper");

var _mediaRules = require("./media-rules");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fetchProfile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (config) {
    const source = config.source;
    const limit = config.limit || 12;
    const exclude = config.exclude || [];

    const _ref2 = yield (0, _scraper.scrapeProfile)(source),
          profile = _ref2.profile,
          timeline = _ref2.timeline;

    return {
      profile,
      timeline: timeline.filter((0, _mediaRules.applyExcludeRules)(exclude)).slice(0, limit)
    };
  });

  return function fetchProfile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchProfile = fetchProfile;