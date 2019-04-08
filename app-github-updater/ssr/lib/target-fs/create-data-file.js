import fs from 'fs-extra'
import path from 'path'
import moment from 'moment'
import aggregateFeed from '@feedlify/feed-aggregator'
import { getFeedDatespan } from './get-datespan-feed'

export const createDataFile = async (root) => {
    const feedDefinition = await fs.readJSON(path.join(root, 'feed.json'))
    const data = await aggregateFeed(feedDefinition)
    const ctime = new Date()
    
    // log the file data
    const fileBasepath = path.join(root, 'data')
    const fileName = `${moment(ctime).format('YYYYMMDDhhmmss')}.json`
    const filePath = path.join(fileBasepath, fileName)

    await fs.ensureDir(fileBasepath)
    await fs.writeJSON(filePath, {
        ...data,
        ctime,
    }, { spaces: 2 })

    // calculate the time span
    const [ fromDate, toDate ] = getFeedDatespan(data.timeline)
    
    return {
        ctime,
        fname: fileName,
        from: fromDate,
        to: toDate,
        count: data.timeline.length,
        data,
    }
}
