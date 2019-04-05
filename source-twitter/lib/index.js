"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "fetchTimeline", {
  enumerable: true,
  get: function get() {
    return _fetchTimeline.fetchTimeline;
  }
});
Object.defineProperty(exports, "fetchProfile", {
  enumerable: true,
  get: function get() {
    return _fetchProfile.fetchProfile;
  }
});
exports.default = void 0;

var _eachLimit = _interopRequireDefault(require("async/eachLimit"));

var _fetchTimeline = require("./fetch-timeline");

var _fetchProfile = require("./fetch-profile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fetchTimelines = function fetchTimelines(configs) {
  let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return new Promise((resolve, reject) => {
    const data = [];

    const onItem =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (config, next) {
        try {
          const items = yield (0, _fetchTimeline.fetchTimeline)(config);
          Array.prototype.push.apply(data, items.map(item => _objectSpread({}, item, {
            origin: "twitter::".concat(config.source)
          })));
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

const fetchProfiles = function fetchProfiles(profiles) {
  let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return new Promise((resolve, reject) => {
    const data = [];

    const onItem =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (username, next) {
        try {
          data.push((yield (0, _fetchProfile.fetchProfile)(username)));
          next();
        } catch (err) {
          next(err);
        }
      });

      return function onItem(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    const onEnd = err => err ? reject(err) : resolve(data);

    (0, _eachLimit.default)(profiles, limit, onItem, onEnd);
  });
};

var _default =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (configs) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // Get sorted timeline
    const timeline = yield fetchTimelines(configs, options.limit);
    timeline.sort((a, b) => b.ctime - a.ctime); // Find out unique referenced profiles

    const usernames = timeline.reduce((acc, curr) => {
      if (!acc.includes(curr.author)) {
        acc.push(curr.author);
      }

      return acc;
    }, []).map($ => $.split('twitter::')[1]);
    const profiles = (yield fetchProfiles(usernames, options.limit)).reduce((acc, curr) => _objectSpread({}, acc, {
      [curr.id]: curr
    }), {});
    return {
      timeline,
      profiles
    };
  });

  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = _default;