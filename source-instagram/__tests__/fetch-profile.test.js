import { fetchProfile } from '../lib/fetch-profile'

// Mock fetch
import fetch from 'isomorphic-fetch'
import fs from 'fs-extra'
import path from 'path'
jest.mock('isomorphic-fetch')
const mockFetchWithHTML = html =>
    fetch.mockImplementation(async (req) => {
        const username = req.split('/').pop()
        try {
            const fpath = path.join(__dirname, `./fixtures/public-profile.${username}.html`)
            const html = await fs.readFile(fpath, 'utf8')
            return { text: () => new Promise((resolve) => resolve(html)) }
        } catch (err) {
            throw err
        }
    })


describe('fetchProfile', () => {
    test('it should scrape a profile by username', async () => {
        mockFetchWithHTML()
        const { timeline, profile } = await fetchProfile({
            source: 'mpeg'
        })

        expect(timeline.length).toBe(12)
    })

    test('it should limit the amount of retrieved media', async () => {
        mockFetchWithHTML()
        const { timeline, profile } = await fetchProfile({
            source: 'mpeg',
            limit: 5,
        })

        expect(timeline.length).toBe(5)
    })

    test('it should remove unwanted tags by string', async () => {
        mockFetchWithHTML()
        const { timeline, profile } = await fetchProfile({
            source: 'mpeg',
            exclude: [
                {
                    rule: 'tag',
                    value: 'nodeconfeu',
                }
            ]
        })

        expect(timeline.length).toBe(11)
    })

    test('it should remove unwanted tags by array', async () => {
        mockFetchWithHTML()
        const { timeline, profile } = await fetchProfile({
            source: 'mpeg',
            exclude: [
                {
                    rule: 'tag',
                    value: [ 'nodeconfeu', 'sequoias' ],
                }
            ]
        })

        expect(timeline.length).toBe(10)
    })
})