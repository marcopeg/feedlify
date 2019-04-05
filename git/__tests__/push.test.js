import fs from 'fs-extra'
import { clone } from '../lib/clone'
import { identity } from '../lib/identity'
import { commit } from '../lib/commit'
import { push } from '../lib/push'

describe('push', () => {
    jest.setTimeout(60000)
    
    beforeEach(() => fs.remove('/tmp/git-tests'))

    test('it should push a change', async () => {
        await clone({
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
            repository: 'marcopeg/hello-world',
            branch: 'master',
            target: '/tmp/git-tests/test-push',
        })

        await fs.writeJson(`/tmp/git-tests/test-push/foo${(new Date()).getTime()}.txt`, { a: 1 })
        await identity({
            email: 'marco.pegoraro@gmail.com',
            username: 'marcopeg',
        })
        await commit('/tmp/git-tests/test-push', 'ok')
        
        await push({
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
            repository: 'marcopeg/hello-world',
            branch: 'master',
            target: '/tmp/git-tests/test-push',
        })
    })
})