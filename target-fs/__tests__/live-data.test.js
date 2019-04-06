import fs from 'fs-extra'
import path from 'path'

import targetFs from '../lib'

// Mock external libraries
// import aggregateFeed from '@feedlify/feed-aggregator'
// jest.mock('@feedlify/feed-aggregator')
// aggregateFeed.mockImplementation(() => {
//     const fixture = require('./fixtures/aggregate-feed.json')
//     fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
//     return fixture
// })

const TMP_FOLDER = '/tmp/feedly/target-fs'

describe.skip('LiveData', () => {
    jest.setTimeout(60000)

    beforeAll(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), path.join(TMP_FOLDER, 'repo1'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo2'), path.join(TMP_FOLDER, 'repo2'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo3'), path.join(TMP_FOLDER, 'repo3'))
        await fs.copy(path.join(__dirname, 'fixtures', 'repo4'), path.join(TMP_FOLDER, 'repo4'))
    })

    test('it should live-update repo1', async () => {
        const report = await targetFs('/tmp/feedly/target-fs/repo1')
        console.log(report)
    })
    
    test('it should live-update repo2', async () => {
        const report = await targetFs('/tmp/feedly/target-fs/repo2')
        console.log(report)
    })
    
    test('it should live-update repo3', async () => {
        const report = await targetFs('/tmp/feedly/target-fs/repo3')
        console.log(report)
    })
    
    test('it should live-update repo4', async () => {
        const report = await targetFs('/tmp/feedly/target-fs/repo4', { limit: 10 })
        console.log(report)
    })
})