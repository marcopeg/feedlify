"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeProfile = exports.scrapeTimeline = void 0;

var _scrapeTwitter = require("scrape-twitter");

var _streamToPromise = _interopRequireDefault(require("stream-to-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Public data wrapper that can be mocked for internal tests.
 * https://www.npmjs.com/package/scrape-twitter
 */
const scrapeTimeline = function scrapeTimeline(username) {
  let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  return (0, _streamToPromise.default)(new _scrapeTwitter.TimelineStream(username, {
    retweets: true,
    count
  }));
};

exports.scrapeTimeline = scrapeTimeline;

const scrapeProfile = username => (0, _scrapeTwitter.getUserProfile)(username);

exports.scrapeProfile = scrapeProfile;