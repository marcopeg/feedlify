/**
 * targetGit
 * =========
 * 
 * It should be able to aim to a @feedlify feed repository and run a
 * maintenance session on it.
 */

import path from 'path'
import fs from 'fs-extra'
import * as git from '@feedlify/git'
import targetFs from 'lib/target-fs'

export default async (options) => {
    const tmpFolder = options.tmpFolder || '/tmp/feedlify/git'
    const repoPath = path.join(tmpFolder, options.repository)
    const dataPath = path.join(repoPath, options.dataPath || '/')
    const authOptions = {
        ...options,
        target: repoPath,
    }

    // ensure folders
    await fs.ensureDir(tmpFolder)
    await fs.ensureDir(repoPath)

    // clone OR pull
    try {
        await git.clone(authOptions)
    } catch (err) {
        console.log(`erorr clone - ${err.message}`)
        await git.pull(authOptions)
    }

    // run the thing
    await targetFs(dataPath)

    // commit & push
    try {
        await git.identity(options)
        try { await git.commit(repoPath, `feed ${(new Date()).toISOString()}`) } catch (err) {}
        await git.push(authOptions)
    } catch (err) {
        console.log(err)
    }
}
