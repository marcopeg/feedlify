"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mediaDataType = void 0;

var _getHashtags = require("./get-hashtags");

const getMediaCaption = item => {
  try {
    return item.node.edge_media_to_caption.edges[0].node.text;
  } catch (err) {
    return '';
  }
};

const mediaDataType = item => {
  const text = getMediaCaption(item);
  return {
    type: 'instagram::media',
    author: "instagram::".concat(item.node.owner.username),
    origin: "instagram::".concat(item.node.owner.username),
    ctime: new Date(item.node.taken_at_timestamp * 1000),
    title: "Media by @".concat(item.node.owner.username),
    text,
    url: "https://www.instagram.com/p/".concat(item.node.shortcode, "/"),
    preview: item.node.thumbnail_src,
    hashtags: (0, _getHashtags.getHashtags)(text),
    __meta: item.node
  };
};

exports.mediaDataType = mediaDataType;