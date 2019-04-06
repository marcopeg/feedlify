import fs from 'fs-extra'
import path from 'path'

import { updateRepo } from '../lib/update-repo'

// Mock external libraries
import aggregateFeed from '@feedlify/feed-aggregator'
jest.mock('@feedlify/feed-aggregator')
aggregateFeed.mockImplementation(() => {
    const fixture = require('./fixtures/aggregate-feed.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})

const TMP_FOLDER = '/tmp/feedly/target-fs'

describe('updateRepo', () => {
    beforeAll(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), path.join(TMP_FOLDER, 'repo1'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo2'), path.join(TMP_FOLDER, 'repo2'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo3'), path.join(TMP_FOLDER, 'repo3'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo4'), path.join(TMP_FOLDER, 'repo4'))
    })

    test('it should update repo1', async () => {
        const report = await updateRepo('/tmp/feedly/target-fs/repo1')
        expect(fs.existsSync('/tmp/feedly/target-fs/repo1/index.json')).toBe(true)
    })
    
    test('it should update repo2', async () => {
        const report = await updateRepo('/tmp/feedly/target-fs/repo2')
        expect(fs.existsSync('/tmp/feedly/target-fs/repo2/index.json')).toBe(true)
    })
    
    test('it should update repo3', async () => {
        const report = await updateRepo('/tmp/feedly/target-fs/repo3')
        expect(fs.existsSync('/tmp/feedly/target-fs/repo3/index.json')).toBe(true)
    })
    
    test('it should update repo4', async () => {
        const report = await updateRepo('/tmp/feedly/target-fs/repo4', { limit: 10 })
        expect(fs.existsSync('/tmp/feedly/target-fs/repo4/index.json')).toBe(true)
    })
})
