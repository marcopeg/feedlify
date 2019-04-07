import targetGit from '../lib'

describe('LiveData', () => {
    jest.setTimeout(60000)

    test('it should live-update repo1', async () => {
        await targetGit({
            repository: 'marcopeg/feedlify-demo',
            email: 'marco.pegoraro@gmail.com',
            username: 'marcopeg',
            password: process.env.GITHUB_TOKEN,
        })
    })
})
