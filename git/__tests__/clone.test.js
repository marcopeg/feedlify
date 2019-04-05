import fs from 'fs-extra'
import { clone } from '../lib/clone'

describe('clone', () => {
    jest.setTimeout(60000)
    
    beforeEach(() => fs.remove('/tmp/git-tests'))

    test('it should clone a public repository', async () => {
        const res = await clone({
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
            repository: 'marcopeg/hello-world',
            branch: 'master',
            target: '/tmp/git-tests/test-clone',
        })
        expect(res).toBe(0)
    })

    test('it should fail if the repo does not exists', async () => {
        try {
            await clone({
                username: 'marcopeg',
                password: process.env.GITHUB_TOKEN,
                repository: 'marcopeg/hello-world-test-clone-1',
                branch: 'master',
                target: '/tmp/git-tests/test-clone-1',
            })
        } catch (err) {
            expect(err.message.indexOf('not found')).toBeGreaterThan(-1)
        }
    })
})