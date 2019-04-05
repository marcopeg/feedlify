# @feedlifly/source-twitter
===========================

This module fetches Twitter public data:

    yarn add @feedlify/source-twitter

You can use `sourceTwitter` to scrape multiple profiles at the same time:

    import sourceTwitter from '@feedlifly/source-twitter'

    const items = await sourceTwitter([
        {
            source: 'thepeg',
            limit: 20,
            exclude: [{
                rule: 'username',
                value: [ 'username1', 'username2', '...' ],
            }]
        },
        {
            source: 'foo',
            ...
        }
    ])

The resulting dataset is organized as follow:

    {
        timeline: [
            {
                type: 'twitter::tweet',
                origin: 'twitter::GettyImages',
                author: 'twitter::GettyImages',
                ctime: new Date(2019-03-27T20:57:40.000Z),
                title: 'Tweet by @GettyImages',
                text: 'Thanks @shondarhimes. We\'re proud of being a part of this powerful initiative.',
                url: 'https://twitter.com/shondarhimes/status/1110912567487029249',
                preview: null,
                hashtags: [],
                __meta: [Object]
            }
        ],
        profiles: {
            'twitter::GettyImages': {
                id: 'twitter::GettyImages',
                username: 'GettyImages',
                pic: 'https://pbs.twimg.com/profile_images/1016315371484114944/hxz9PNy6_400x400.jpg',
                url: 'https://twitter.com/GettyImages',
                __meta: []
            }
        }
    }

`timeline` contains a list of contents as feedlify normalized data structure.
The items are sorted by date from the most recent.

You can use `timeline.[].author` as index in the `profiles` bucket to retrieve
informations that are relevant to the whom has produced the content.

The filed `__meta` contains original data that was extracted from Twitter.
