import moment from 'moment'
import targetGit from '@feedlify/target-git'
import { START_FEATURE } from '@marcopeg/hooks'
import { FEATURE_NAME } from './hooks'
import { logInfo, logError, logDebug, logVerbose } from 'services/logger'

export const register = ({ registerAction }) =>
    registerAction({
        hook: START_FEATURE,
        name: FEATURE_NAME,
        trace: __filename,
        handler: ({ targetGit: settings }) => {
            const loop = async () => {
                
                try {
                    const start = new Date()
                    logInfo(`[${moment().format('YYYY/MM/DD hh:mm:ss')}] Start working on the feed`)
                    await targetGit(settings)
                    logInfo(`the feed was updated in ${new Date() - start}ms`)
                } catch (err) {
                    logError(err.message)
                    logDebug(err)
                } finally {
                    logVerbose(`next iteration in ${settings.interval}ms`)
                    setTimeout(loop, settings.interval)
                }
            }

            loop()
        },
    })
