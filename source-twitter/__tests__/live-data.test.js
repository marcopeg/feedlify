import sourceTwitter, { fetchTimeline, fetchProfile } from '../lib/index'

describe('LiveData', () => {
    jest.setTimeout(60000)
    test('it should work', async () => {
        const data = await sourceTwitter([
            {
                source: 'GettyImages',
                limit: 10,
            },
            {
                source: 'thepeg',
                limit: 10,
            },
        ], { limit: 10 })

        console.log(data)
    })
})