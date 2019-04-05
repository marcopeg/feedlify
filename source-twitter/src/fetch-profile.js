import { scrapeProfile } from './scraper'
import { profileDataType } from './data-type-profile'

export const fetchProfile = async (username) => {
    const profile = await scrapeProfile(username)
    return profileDataType(profile)
}
