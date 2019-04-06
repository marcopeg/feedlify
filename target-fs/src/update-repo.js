import path from 'path'
import fs from 'fs-extra'
import { computeRepoIndex } from './compute-repo-index'
import eachLimit from 'async/eachLimit'
import { updateFeed } from './update-feed'

const updateFeeds = (items) =>
    new Promise((resolve, reject) => {
        const reports = []

        const onItem = async (item, next) => {
            try {
                const feedRoot = path.dirname(item.fpath)
                const report = await updateFeed(feedRoot)
                reports.push(report)
                next()
            } catch (err) {
                next(err)
            }
        }

        const onEnd = (err) => err ? reject(err) : resolve(reports)
        eachLimit(items, 1, onItem, onEnd)
    })

export const updateRepo = async (root, { limit } = {}) => {
    const indexBefore = await computeRepoIndex(root)
    
    // calculate which feeds to update
    const feeds = indexBefore.feeds.slice(0, limit || 1)
    const updatedFeed = await updateFeeds(feeds)

    // update the repository index with the new informations
    const indexAfter = await computeRepoIndex(root)
    indexAfter.feeds = indexAfter.feeds.map(feed => ({
        ref: feed.name,
        name: feed.name,
        ctime: feed.index.ctime,
        mtime: feed.index.mtime,
        from: feed.index.from,
        to: feed.index.to,
        count: feed.index.count,
        data_files_count: feed.index && feed.index.data
            ? feed.index.data.length
            : 0,
    }))

    await fs.writeJSON(path.join(root, 'index.json'), indexAfter, { spaces: 2 })
    return indexAfter
}
