import { exec } from './exec'

export const status = async (target) => {
    const options = {
        cwd: target,
    }

    return exec('git status', options)
}
