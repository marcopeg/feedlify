import fs from 'fs-extra'
import { clone } from '../lib/clone'
import { pull } from '../lib/pull'

describe('pull', () => {
    jest.setTimeout(60000)
    
    beforeEach(() => fs.remove('/tmp/git-tests'))

    test('it should pull a change', async () => {
        await clone({
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
            repository: 'marcopeg/hello-world',
            branch: 'master',
            target: '/tmp/git-tests/test-pull',
        })

        // await fs.writeJson('/tmp/git-tests/test-pull/foo.txt', { a: 1 })
        await pull({
            branch: 'master',
            target: '/tmp/git-tests/test-pull',
        })
    })
})