import sourceInstagram from '../lib/index'

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

describe('LiveData', () => {
    beforeEach(() => {
        jest.setTimeout(60000)
        mockFetchWithHTML()
    })

    test('it should fetch multiple profiles', async () => {
        

        const data = await sourceInstagram([
            {
                source: 'mpeg',
                limit: 5,
            },
            {
                source: 'i_love_being_healthy_88',
                limit: 5,
            },
        ], { limit: 10 })

        expect(Object.keys(data.profiles).length).toBe(2)
        expect(data.timeline.length).toBe(10)
    })
    
    test('it should remove tags from multiple profiles', async () => {
        const data = await sourceInstagram([
            {
                source: 'mpeg',
                exclude: [
                    {
                        rule: 'tag',
                        value: [ 'nodeconfeu', 'sequoias' ],
                    }
                ]
            },
            {
                source: 'i_love_being_healthy_88',
                exclude: [
                    {
                        rule: 'tag',
                        value: [ 'dietaendometriosi', 'vegetariana' ],
                    }
                ]
            },
        ], { limit: 10 })

        expect(Object.keys(data.profiles).length).toBe(2)
        expect(data.timeline.length).toBe(10)
    })
})
