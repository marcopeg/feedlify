import fs from 'fs-extra'
import path from 'path'
import moment from 'moment'
import aggregateFeed from '@feedlify/feed-aggregator'
import { getDatespan } from './get-datespan'

export const createDataFile = async (root) => {
    const feedDefinition = await fs.readJSON(path.join(root, 'feed.json'))
    const data = aggregateFeed(feedDefinition)
    
    // log the file data
    const fileBasepath = path.join(root, 'data')
    const fileName = `${moment().format('YYYYMMDDhhmmss')}.json`
    const filePath = path.join(fileBasepath, fileName)

    await fs.ensureDir(fileBasepath)
    await fs.writeJSON(filePath, data)

    // calculate the time span
    const [ fromDate, toDate ] = getDatespan(data.timeline)
    
    return {
        fileName,
        filePath,
        fromDate,
        toDate,
        data,
    }
}
