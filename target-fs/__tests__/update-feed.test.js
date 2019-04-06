import fs from 'fs-extra'
import path from 'path'

import { updateFeed } from '../lib/update-feed'

// Mock external libraries
import aggregateFeed from '@feedlify/feed-aggregator'
jest.mock('@feedlify/feed-aggregator')
aggregateFeed.mockImplementation(() => {
    const fixture = require('./fixtures/aggregate-feed.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})

const TMP_FOLDER = '/tmp/feedly/target-fs'

describe('updateFeed', () => {
    jest.setTimeout(60000)

    beforeEach(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), path.join(TMP_FOLDER, 'repo1'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo2'), path.join(TMP_FOLDER, 'repo2'))
    })

    test('it should create an index from scratch', async () => {
        const report = await updateFeed(path.join('/tmp/feedly/target-fs/repo1', 'general'))
        expect(fs.existsSync('/tmp/feedly/target-fs/repo1/general/index.json')).toBe(true)
        expect(report.count).toBe(52)
        expect(report.data.length).toBe(1)
    })

    test('it should update an existing index', async () => {
        const report = await updateFeed(path.join('/tmp/feedly/target-fs/repo2', 'general'))
        expect(fs.existsSync('/tmp/feedly/target-fs/repo2/general/index.json')).toBe(true)
        expect(report.data.length).toBe(2)
        expect(report.count).toBe(104)
    })
})
