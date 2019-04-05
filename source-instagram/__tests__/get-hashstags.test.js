import { getHashtags } from '../lib/get-hashtags'

describe('get-hashtags', () => {
    test('it should get hashtags', () => {
        const res = getHashtags('So much better than wine labels! #nordic #beer #ipa #creativity #storytelling #truestory')
        expect(res.length).toBe(6)
        expect(res[0]).toBe('nordic')
    })
})
