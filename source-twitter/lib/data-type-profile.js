"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileDataType = void 0;

const profileDataType = profile => {
  return {
    id: "twitter::".concat(profile.screenName),
    username: profile.screenName,
    pic: profile.profileImage,
    url: "https://twitter.com/".concat(profile.screenName),
    __meta: profile
  };
};

exports.profileDataType = profileDataType;