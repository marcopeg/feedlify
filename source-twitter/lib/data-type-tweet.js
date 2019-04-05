"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweetDataType = void 0;

const tweetDataType = tweet => {
  return {
    type: 'twitter::tweet',
    author: "twitter::".concat(tweet.screenName),
    ctime: new Date(tweet.time),
    title: "Tweet by @".concat(tweet.screenName),
    text: tweet.text,
    url: tweet.urls.length === 0 ? "https://twitter.com/".concat(tweet.screenName, "/status/").concat(tweet.id) : tweet.urls[0].url,
    preview: tweet.images.length > 0 ? tweet.images[0] : null,
    hashtags: tweet.hashtags.map($ => $.hashtag),
    __meta: tweet
  };
};

exports.tweetDataType = tweetDataType;