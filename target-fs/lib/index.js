"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _feedAggregator = _interopRequireDefault(require("@feedlify/feed-aggregator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (root) {
    const feed = yield _fsExtra.default.readJSON(_path.default.join(root, 'feed.json'));
    console.log('What do I do?', root);
    console.log(feed); // const data = await aggregateFeed(feed)
    // await fs.writeJSON('/tmp/aggregate-feed.json', data)
    // console.log(data)
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;