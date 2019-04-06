import fs from 'fs-extra'
import path from 'path'
import { createDataFile } from './create-data-file'
import { getIndexDatespan } from './get-datespan-index'

export const updateFeed = async (root) => {
    // get existing index or default to an empty data structure
    const indexPath = path.join(root, 'index.json')
    let index = null
    try {
        index = await fs.readJSON(indexPath)
    } catch (err) {
        index = { 
            from: null,
            to: null,
            count: 0,
            data: []
        }
    }

    // fetch new data as generated report
    const report = await createDataFile(root)
    delete(report.data)

    // update the index
    index.data.unshift(report)
    const [ from, to ] = getIndexDatespan(index.data)
    index.from = from
    index.to = to
    index.count = index.data.reduce((acc, curr) => acc + curr.count, 0)
    await fs.writeJSON(indexPath, index, { spaces: 2 })

    return index
}
