import fs from 'fs-extra'

export const initFeedIndex = async (fpath) => {
    const index = {
        ctime: new Date(),
        mtime: null,
        from: null,
        to: null,
        count: 0,
        data: [],
    }
    await fs.writeJSON(fpath, index, { spaces: 2 })
    return index
}
