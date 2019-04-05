import eachLimit from 'async/eachLimit'
import { fetchTimeline } from './fetch-timeline'
import { fetchProfile } from './fetch-profile'

export { fetchTimeline } from './fetch-timeline'
export { fetchProfile } from './fetch-profile'

const fetchTimelines = (configs, limit = 2) =>
    new Promise((resolve, reject) => {
        const data = []
        const onItem = async (config, next) => {
            try {
                const items = await fetchTimeline(config)
                Array.prototype.push.apply(data, items.map(item => ({
                    ...item,
                    origin: `twitter::${config.source}`,
                })))
                next()
            } catch (err) {
                next(err)
            }
        }
        const onEnd = (err) => err ? reject(err) : resolve(data)
        eachLimit(configs, limit, onItem, onEnd)
    })

const fetchProfiles = (profiles, limit = 2) =>
    new Promise((resolve, reject) => {
        const data = []
        const onItem = async (username, next) => {
            try {
                data.push(await fetchProfile(username))
                next()
            } catch (err) {
                next(err)
            }
        }
        const onEnd = (err) => err ? reject(err) : resolve(data)
        eachLimit(profiles, limit, onItem, onEnd)
    })

export default async (configs, options = {}) => {
    // Get sorted timeline
    const timeline = await fetchTimelines(configs, options.limit)
    timeline.sort((a, b) => (b.ctime - a.ctime))

    // Find out unique referenced profiles
    const usernames = timeline
        .reduce((acc, curr) => {
            if (!acc.includes(curr.author)) {
                acc.push(curr.author)
            }
            return acc
        }, [])
        .map($ => $.split('twitter::')[1])

    const profiles = (await fetchProfiles(usernames, options.limit))
        .reduce((acc, curr) => ({
            ...acc,
            [curr.id]: curr,
        }), {})

    return {
        timeline,
        profiles,
    }
}
