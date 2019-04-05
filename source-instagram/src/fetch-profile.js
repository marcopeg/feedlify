import { scrapeProfile } from './scraper'
import { applyExcludeRules } from './media-rules'

export const fetchProfile = async (config) => {
    const { source } = config
    const limit = config.limit || 12
    const exclude = config.exclude || []

    const { profile, timeline } = await scrapeProfile(source)

    return {
        profile,
        timeline: timeline
            .filter(applyExcludeRules(exclude))
            .slice(0, limit),
    }
}
