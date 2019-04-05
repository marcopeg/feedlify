import eachLimit from 'async/eachLimit'
import { fetchProfile } from './fetch-profile'
// import { fetchProfile } from './fetch-profile'

// export { fetchTimeline } from './fetch-timeline'
// export { fetchProfile } from './fetch-profile'

const fetchProfiles = (configs, limit = 2) =>
    new Promise((resolve, reject) => {
        const data = []
        const onItem = async (config, next) => {
            try {
                const profile = await fetchProfile(config)
                profile.source = `instagram::${config.source}`
                data.push(profile)
                next()
            } catch (err) {
                next(err)
            }
        }
        const onEnd = (err) => err ? reject(err) : resolve(data)
        eachLimit(configs, limit, onItem, onEnd)
    })

export default async (configs, options = {}) => {
    // Fetches and merges multiple origins
    const { profiles, timeline } = (await fetchProfiles(configs, options.limit))
        .reduce((acc, curr) => {
            acc.profiles[curr.profile.id] = curr.profile
            Array.prototype.push.apply(acc.timeline, curr.timeline)
            return acc
        }, {
            timeline: [],
            profiles: {},
        })
    
    timeline.sort((a, b) => (b.ctime - a.ctime))
    
    return {
        timeline,
        profiles,
    }
}
