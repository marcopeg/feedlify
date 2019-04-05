import { spawn } from './spawn'

export const pull = (git, options) => {
    const { target, branch } = git

    const cmd = [
        `git pull`,
        `origin ${branch}`,
    ].join(' ')

    return spawn(cmd, {
        ...options,
        cwd: target,
    })
}