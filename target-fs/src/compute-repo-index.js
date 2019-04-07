/**
 * Calculates the current index of a repository walking through all
 * the listed feeds.
 */

import path from 'path'
import fs from 'fs-extra'
import map from 'async/map'
import { loadFeedIndex } from './load-feed-index'

const getMTime = (index) => {
    if (index && index.mtime) {
        return index.mtime
    }

    return new Date('1981-06-30T15:05:00.000Z')
}

const getFeeds = (root) =>
    new Promise(async (resolve, reject) => {
        const feeds = (await fs.readdir(root))
            .filter(entry => (
                entry !== 'index.json'
                && entry !== 'README.md'
                && entry !== 'docs'
                && entry.substr(0, 1) !== '.'
            ))

        const onItem = async (name, next) => {
            const fpath = path.join(root, name, 'index.json')
            let index = null
            try {
                index = await loadFeedIndex(fpath)
            } catch (err) {
                index = null
            }

            next(null, {
                name,
                fpath,
                mtime: getMTime(index),
                index,
            })
        }

        const onEnd = (err, data) => err ? reject(err) : resolve(data)
        map(feeds, onItem, onEnd)
    })

export const computeRepoIndex = async (root) => {
    const feeds = await getFeeds(root)
    feeds.sort((a, b) => a.mtime - b.mtime)

    return {
        feeds,
    }
}