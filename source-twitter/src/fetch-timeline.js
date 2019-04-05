import { scrapeTimeline } from './scraper'
import { applyExcludeRules } from './timeline-rules'
import { tweetDataType } from './data-type-tweet'

export const fetchTimeline = async (config) => {
    const { source } = config
    const limit = config.limit || 20
    const exclude = config.exclude || []

    return (await scrapeTimeline(source, limit))
        .filter(applyExcludeRules(exclude))
        .slice(0, limit)
        .map(tweetDataType)
}
