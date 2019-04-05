import fs from 'fs-extra'
import path from 'path'
import aggregateFeed from '@feedlify/feed-aggregator'

export default async (root) => {
    const feed = await fs.readJSON(path.join(root, 'feed.json'))
    console.log('What do I do?', root)
    console.log(feed)

    // const data = await aggregateFeed(feed)
    // await fs.writeJSON('/tmp/aggregate-feed.json', data)
    // console.log(data)
}
