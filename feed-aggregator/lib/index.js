"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eachLimit = _interopRequireDefault(require("async/eachLimit"));

var _sourceInstagram = _interopRequireDefault(require("@feedlify/source-instagram"));

var _sourceTwitter = _interopRequireDefault(require("@feedlify/source-twitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const resolvers = [{
  type: 'twitter',
  fn: _sourceTwitter.default
}, {
  type: 'instagram',
  fn: _sourceInstagram.default
}];

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (def) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise((resolve, reject) => {
      const results = [];
      const groups = resolvers.map(resolver => _objectSpread({}, resolver, {
        origins: def.origins.filter(origin => origin.type === resolver.type)
      }));

      const onItem =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(function* (resolver, next) {
          try {
            const data = yield resolver.fn(resolver.origins, options);

            if (options.debug !== true) {
              data.timeline = data.timeline.map(item => {
                delete item.__meta;
                return item;
              });
              Object.keys(data.profiles).forEach(key => {
                delete data.profiles[key].__meta;
              });
            } // -- debug for testing
            // const path = require('path')
            // const fs = require('fs-extra')
            // fs.writeJSONSync(path.join(__dirname, `../__tests__/fixtures/results-${resolver.type}.json`), data, { spaces: 4 })
            // -- debug for testing


            results.push(data);
            next();
          } catch (err) {
            next(err);
          }
        });

        return function onItem(_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      const onEnd = err => {
        if (err) {
          reject(err);
          return;
        }

        const aggregatedResults = results.reduce((acc, curr) => ({
          timeline: [...acc.timeline, ...curr.timeline],
          profiles: _objectSpread({}, acc.profiles, curr.profiles)
        }), {
          timeline: [],
          profiles: {}
        });
        aggregatedResults.timeline.sort((a, b) => b.ctime - a.ctime);
        resolve(aggregatedResults);
      };

      (0, _eachLimit.default)(groups, options.limitOrigins || 1, onItem, onEnd);
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;