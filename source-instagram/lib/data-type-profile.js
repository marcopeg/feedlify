"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileDataType = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const profileDataType = data => {
  const profile = {
    id: "instagram::".concat(data.username),
    username: data.username,
    pic: data.profile_pic_url,
    url: "https://instagram.com/".concat(data.username),
    __meta: _objectSpread({}, data) // remove unecessary original data

  };
  delete profile.__meta.edge_owner_to_timeline_media;
  delete profile.__meta.edge_felix_video_timeline;
  delete profile.__meta.edge_saved_media;
  delete profile.__meta.edge_media_collections;
  return profile;
};

exports.profileDataType = profileDataType;