# @feedlifly/source-instagram
=============================

This module fetches Twitter public data:

    yarn add @feedlifly/source-instagram

You can use `sourceInstagram` to scrape multiple profiles at the same time:

    import sourceInstagram from '@feedlifly/source-instagram'

    const items = await sourceInstagram([
        {
            source: 'mpeg',
            limit: 20,
            exclude: [{
                rule: 'tag',
                value: [ 'tag1', 'tag2', '...' ],
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
                type: 'instagram::media',
                origin: 'instagram::mpeg',
                author: 'instagram::mpeg',
                ctime: 2017-05-19T09:38:37.000Z,
                title: 'Media by @mpeg',
                text: '#bbq #weber #ribs',
                url: 'https://www.instagram.com/p/BUROlKpAjSX/',
                preview: 'https://scontent-arn2-1.cdninstagram.com/vp/bf5bb1f21554be4a7d2a57b43fde2a27/5D41CF3F/t51.2885-15/e35/c0.0.611.611/18512375_1923014867981898_3206383443709526016_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com',
                hashtags: [ 'bbq', 'weber', 'ribs' ],
            }
        ],
        profiles: {
            'instagram::mpeg': {
                id: 'instagram::mpeg',
                username: 'mpeg',
                pic: 'https://scontent-arn2-1.cdninstagram.com/vp/ff4ebcf53e0a3dca7b4b4ec0d0082bde/5D4611BF/t51.2885-19/11311132_958407607554863_1903430048_a.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com',
                url: 'https://instagram.com/mpeg',
            }
        }
    }

`timeline` contains a list of contents as feedlify normalized data structure.  
The items are sorted by date from the most recent.

You can use `timeline.[].author` as index in the `profiles` bucket to retrieve
informations that are relevant to the whom has produced the content.

The filed `__meta` contains original data that was extracted from Twitter.
