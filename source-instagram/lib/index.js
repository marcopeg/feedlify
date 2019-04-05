"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eachLimit = _interopRequireDefault(require("async/eachLimit"));

var _fetchProfile = require("./fetch-profile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { fetchProfile } from './fetch-profile'
// export { fetchTimeline } from './fetch-timeline'
// export { fetchProfile } from './fetch-profile'
const fetchProfiles = function fetchProfiles(configs) {
  let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return new Promise((resolve, reject) => {
    const data = [];

    const onItem =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (config, next) {
        try {
          const profile = yield (0, _fetchProfile.fetchProfile)(config);
          profile.source = "instagram::".concat(config.source);
          data.push(profile);
          next();
        } catch (err) {
          next(err);
        }
      });

      return function onItem(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    const onEnd = err => err ? reject(err) : resolve(data);

    (0, _eachLimit.default)(configs, limit, onItem, onEnd);
  });
};

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (configs) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Fetches and merges multiple origins
    const _reduce = (yield fetchProfiles(configs, options.limit)).reduce((acc, curr) => {
      acc.profiles[curr.profile.id] = curr.profile;
      Array.prototype.push.apply(acc.timeline, curr.timeline);
      return acc;
    }, {
      timeline: [],
      profiles: {}
    }),
          profiles = _reduce.profiles,
          timeline = _reduce.timeline;

    timeline.sort((a, b) => b.ctime - a.ctime);
    return {
      timeline,
      profiles
    };
  });

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;