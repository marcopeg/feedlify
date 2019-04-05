import { scrapeProfile } from '../lib/scraper'

// Mock fetch
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch')

const mockFetchWithHTML = html =>
    fetch.mockImplementationOnce(() =>
        new Promise(resolve => resolve({
            text: () => new Promise((resolve) => resolve(html))
        })))

// Load mocks
import fs from 'fs-extra'
import path from 'path'
const publicProfile = fs.readFileSync(path.join(__dirname, './fixtures/public-profile.html'), 'utf8')

describe('scraper', () => {
    test('it should get a public profile', async () => {
        mockFetchWithHTML(publicProfile)
        const data = await scrapeProfile('mpeg')
        expect(data).toHaveProperty('timeline')
        expect(data).toHaveProperty('profile')
    })
})
