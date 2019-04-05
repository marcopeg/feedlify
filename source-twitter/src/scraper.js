/**
 * Public data wrapper that can be mocked for internal tests.
 * https://www.npmjs.com/package/scrape-twitter
 */

import { TimelineStream, getUserProfile } from 'scrape-twitter'
import streamToPromise from 'stream-to-promise'

export const scrapeTimeline = (username, count = 20) =>
    streamToPromise(new TimelineStream(username, {
        retweets: true,
        count,
    }))

export const scrapeProfile = (username) =>
    getUserProfile(username)
