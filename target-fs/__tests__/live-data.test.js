import fs from 'fs-extra'
import path from 'path'

import targetFs from '../lib/index'

const TMP_FOLDER = '/tmp/feedly/target-fs/repo1'

describe('LiveData', () => {
    jest.setTimeout(60000)

    beforeEach(async () => {
        await fs.remove(TMP_FOLDER)
        await fs.copy(path.join(__dirname, 'fixtures', 'repo1'), TMP_FOLDER)
    })

    test('it should work', async () => {
        const report = await targetFs(path.join('/tmp/feedly/target-fs/repo1', 'general'))
        console.log(report)
    })
})
