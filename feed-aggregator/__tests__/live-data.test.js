import aggregateFeed from '../lib/index'

// Mock external libraries
import sourceInstagram from '@feedlify/source-instagram'
import sourceTwitter from '@feedlify/source-twitter'
jest.mock('@feedlify/source-instagram')
jest.mock('@feedlify/source-twitter')
sourceInstagram.mockImplementation(() => {
    const fixture = require('./fixtures/results-instagram.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})
sourceTwitter.mockImplementation(() => {
    const fixture = require('./fixtures/results-twitter.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})

describe('LiveData', () => {
    jest.setTimeout(60000)
    test('it should work', async () => {
        const data = await aggregateFeed({
            origins: [
                {
                    type: 'twitter',
                    source: 'GettyImages',
                },
                {
                    type: 'twitter',
                    source: 'thepeg',
                },
                {
                    type: 'instagram',
                    source: 'mpeg',
                },
                {
                    type: 'instagram',
                    source: 'i_love_being_healthy_88',
                },
            ]
        }, {
            limit: 4,
            limitOrigins: 4
        })

        expect(data.profiles['twitter::thepeg']).toHaveProperty('username', 'thepeg')
        expect(data.timeline.length).toBe(64)

        // -- debug for testing
        // const path = require('path')
        // const fs = require('fs-extra')
        // fs.writeJSONSync(path.join(__dirname, `./fixtures/results.json`), data, { spaces: 4 })
        // -- debug for testing
    })
})