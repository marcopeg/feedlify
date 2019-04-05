import eachLimit from 'async/eachLimit'
import sourceInstagram from '@feedlify/source-instagram'
import sourceTwitter from '@feedlify/source-twitter'

const resolvers = [
    {
        type: 'twitter',
        fn: sourceTwitter,
    },
    {
        type: 'instagram',
        fn: sourceInstagram,
    }
]

export default async (def, options = {}) =>
    new Promise((resolve, reject) => {
        const results = []

        const groups = resolvers
            .map(resolver => ({
                ...resolver,
                origins: def.origins.filter(origin => origin.type === resolver.type)
            }))
    
        const onItem = async (resolver, next) => {
            try {
                const data = await resolver.fn(resolver.origins, options)

                if (options.debug !== true) {
                    data.timeline = data.timeline.map(item => {
                        delete(item.__meta)
                        return item
                    })
                    Object.keys(data.profiles).forEach(key => {
                        delete(data.profiles[key].__meta)
                    })
                }

                // -- debug for testing
                // const path = require('path')
                // const fs = require('fs-extra')
                // fs.writeJSONSync(path.join(__dirname, `../__tests__/fixtures/results-${resolver.type}.json`), data, { spaces: 4 })
                // -- debug for testing

                results.push(data)
                next()
            } catch (err) {
                next(err)
            }
        }
        
        const onEnd = (err) => {
            if (err) {
                reject(err)
                return
            }

            const aggregatedResults = results.reduce((acc, curr) => ({
                timeline: [
                    ...acc.timeline,
                    ...curr.timeline,
                ],
                profiles: {
                    ...acc.profiles,
                    ...curr.profiles,
                },
            }), {
                timeline: [],
                profiles: {},
            })

            aggregatedResults.timeline.sort((a, b) => (b.ctime - a.ctime))
            resolve(aggregatedResults)
        }
        
        eachLimit(groups, options.limitOrigins || 1, onItem, onEnd)
    })