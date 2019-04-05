import { fetchTimeline } from '../lib/index'

// Mock the scraper
import * as scraper from '../lib/scraper'
import timelineFixture from './fixtures/timeline.json'
import profileFixture from './fixtures/profile.json'

jest.mock('../lib/scraper')
scraper.scrapeTimeline.mockImplementation(() => timelineFixture)
scraper.scrapeProfile.mockImplementation(() => profileFixture)


describe('SourceTwitter', () => {
    test('it should get a full timeline', async () => {
        const res = await fetchTimeline({
            source: 'thepeg',
        })

        expect(res.length).toBe(20)
    })

    test('it should limit the amount of retrieved tweets', async () => {
        const res = await fetchTimeline({
            source: 'thepeg',
            limit: 10,
        })

        expect(res.length).toBe(10)
    })

    test('it should remove unwanted usernames', async () => {
        const res = await fetchTimeline({
            source: 'thepeg',
            exclude: [
                {
                    rule: 'username',
                    value: [ 'AdamRutherford', 'kuizinas', 'obensource' ],
                }
            ]
        })

        expect(res.length).toBe(17)
    })

    test('it should ignore unexistent rules without throwing errors', async () => {
        const res = await fetchTimeline({
            source: 'thepeg',
            exclude: [
                {
                    rule: 'foo',
                    value: 123,
                }
            ]
        })

        expect(res.length).toBe(20)
    })
    
    test('it should ignore rules that throw errors', async () => {
        const res = await fetchTimeline({
            source: 'thepeg',
            exclude: [
                {
                    rule: 'username',
                    value: false,
                }
            ]
        })

        expect(res.length).toBe(20)
    })
})
