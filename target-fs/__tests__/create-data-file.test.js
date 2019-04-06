import fs from 'fs-extra'
import path from 'path'

import { createDataFile } from '../lib/create-data-file'

// Mock external libraries
import aggregateFeed from '@feedlify/feed-aggregator'
jest.mock('@feedlify/feed-aggregator')
aggregateFeed.mockImplementation(() => {
    const fixture = require('./fixtures/aggregate-feed.json')
    fixture.timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    return fixture
})

const TMP_FOLDER = '/tmp/feedly/target-fs/repo1'

describe('LiveData', () => {
    jest.setTimeout(60000)

    beforeEach(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), TMP_FOLDER)
    })

    test('it should generate th new data file', async () => {
        const report = await createDataFile(path.join('/tmp/feedly/target-fs/repo1', 'general'))
        expect(report).toHaveProperty('fpath')
        expect(fs.existsSync(report.fpath)).toBe(true)
        expect(report.from).toEqual(new Date('2019-03-02T18:20:20.000Z'))
        expect(report.to).toEqual(new Date('2019-04-05T16:07:26.000Z'))
    })
})
