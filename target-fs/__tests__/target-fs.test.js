import fs from 'fs-extra'
import path from 'path'

import targetFs from '../lib/index'

// Mock external libraries
import aggregateFeed from '@feedlify/feed-aggregator'
jest.mock('@feedlify/feed-aggregator')
aggregateFeed.mockImplementation(() => {
    const fixture = require('./fixtures/aggregate-feed.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})

const TMP_FOLDER = '/tmp/feedly/target-fs/repo1'

describe.skip('testFs', () => {
    beforeEach(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), TMP_FOLDER)
    })

    test('it should work a definition', async () => {
        const report = await targetFs(path.join('/tmp/feedly/target-fs/repo1', 'general'))
        console.log(report)
    })
})
