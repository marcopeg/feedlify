import { profileDataType } from '../lib/data-type-profile'
import profileFixture from './fixtures/profile.json'

describe('profileDataType', () => {
    test('it should implement the generic profile data structure', () => {
        const profile = profileDataType(profileFixture)
        expect(profile.id).toBe('twitter::thepeg')
        expect(profile.username).toBe('thepeg')
        expect(profile.pic).toBe('https://pbs.twimg.com/profile_images/552549894376812544/xlUhrECS_400x400.jpeg')
        expect(profile.url).toBe('https://twitter.com/thepeg')
    })
})
