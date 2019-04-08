/**
 * Fetches a JSON file index and transform dates to Javascript objects
 */

import fs from 'fs-extra'

export const loadFeedIndex = async (fpath) => {
    const json = await fs.readJSON(fpath)

    return {
        ...json,
        ...json.ctime && { ctime: new Date(json.ctime) },
        ...json.mtime && { mtime: new Date(json.mtime) },
        ...json.from && { from: new Date(json.from) },
        ...json.to && { to: new Date(json.to) },
        data: json.data.map(item => ({
            ...item,
            ...item.ctime && { ctime: new Date(item.ctime) },
            ...item.from && { from: new Date(item.from) },
            ...item.to && { to: new Date(item.to) },
        }))
    }
}
