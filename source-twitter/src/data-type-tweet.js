
export const tweetDataType = (tweet) => {
    return {
        type: 'twitter::tweet',
        author: `twitter::${tweet.screenName}`,
        ctime: new Date(tweet.time),
        title: `Tweet by @${tweet.screenName}`,
        text: tweet.text,
        url: tweet.urls.length === 0
            ? `https://twitter.com/${tweet.screenName}/status/${tweet.id}`
            : tweet.urls[0].url,
        preview: tweet.images.length > 0
            ? tweet.images[0]
            : null,
        hashtags: tweet.hashtags.map($ => $.hashtag),
        __meta: tweet,
    }
}
