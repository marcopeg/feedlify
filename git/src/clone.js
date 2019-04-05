import { spawn } from './spawn'

export const clone = (git, options = {}) => {
    const { username, password, repository, branch, target } = git

    const cmd = [
        `git clone`,
        `--single-branch --branch ${branch || 'master'}`,
        `https://${username}:${password}@github.com/${repository}.git`,
        target,
    ].join(' ')

    return spawn(cmd, options)
}