"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeProfile = exports.extractTimeline = exports.extractProfileData = exports.fetchProfile = void 0;

var _dataTypeMedia = require("./data-type-media");

var _dataTypeProfile = require("./data-type-profile");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Public data wrapper that can be mocked for internal tests.
 */
const fetch = require('isomorphic-fetch');

const fetchProfile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (username) {
    const res = yield fetch("https://instagram.com/".concat(username));
    return res.text();
  });

  return function fetchProfile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchProfile = fetchProfile;

const extractProfileData = html => {
  const data = JSON.parse(html.split('window._sharedData =')[1].split(';</script>')[0]);
  return data.entry_data.ProfilePage[0].graphql.user;
};

exports.extractProfileData = extractProfileData;

const extractTimeline = profileData => {
  return profileData.edge_owner_to_timeline_media.edges.map(_dataTypeMedia.mediaDataType);
};

exports.extractTimeline = extractTimeline;

const scrapeProfile =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (username) {
    const html = yield fetchProfile(username);
    const profileData = extractProfileData(html);
    const timeline = extractTimeline(profileData);
    delete profileData.edge_owner_to_timeline_media;
    return {
      timeline,
      profile: (0, _dataTypeProfile.profileDataType)(profileData)
    };
  });

  return function scrapeProfile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.scrapeProfile = scrapeProfile;