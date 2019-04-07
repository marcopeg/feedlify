import { registerAction, createHookApp, logBoot } from '@marcopeg/hooks'
import { SETTINGS, FINISH } from '@marcopeg/hooks'
import * as config from '@marcopeg/utils/lib/config'

const services = [
    require('./services/env'),
    require('./services/logger'),
]

const features = [
    require('./features/updater'),
]

registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: async ({ settings }) => {
        settings.targetGit = {
            email: config.get('GITHUB_EMAIL'),
            username: config.get('GITHUB_USERNAME'),
            password: config.get('GITHUB_PASSWORD'),
            repository: config.get('GITHUB_REPOSITORY'),
            dataPath: config.get('GITHUB_DATA', '/'),
            tmpFolder: config.get('DATA_PATH', '/var/lib/feedlify'),
            interval: Number(config.get('INTERVAL')),
        }
    },
})

registerAction({
    hook: FINISH,
    name: '♦ boot',
    handler: () => logBoot(),
})

export default createHookApp({
    settings: {},
    services,
    features,
})
