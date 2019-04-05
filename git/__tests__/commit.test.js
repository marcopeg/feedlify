import fs from 'fs-extra'
import { clone } from '../lib/clone'
import { commit } from '../lib/commit'

describe('commit', () => {
    jest.setTimeout(60000)
    
    beforeEach(() => fs.remove('/tmp/git-tests'))

    test('it should commit a change', async () => {
        await clone({
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
            repository: 'marcopeg/hello-world',
            branch: 'master',
            target: '/tmp/git-tests/test-commit',
        })

        await fs.writeJson(`/tmp/git-tests/test-commit/foo${(new Date()).getTime()}.txt`, { a: 1 })
        await commit('/tmp/git-tests/test-commit', 'ok')
    })
})