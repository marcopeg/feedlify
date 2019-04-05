/**
 * Public data wrapper that can be mocked for internal tests.
 */

const fetch = require('isomorphic-fetch')
import { mediaDataType } from './data-type-media'
import { profileDataType } from './data-type-profile'

export const fetchProfile = async (username) => {
    const res = await fetch(`https://instagram.com/${username}`)
    return res.text()
}

export const extractProfileData = (html) => {
    const data = JSON.parse(html.split('window._sharedData =')[1].split(';</script>')[0])
    return data.entry_data.ProfilePage[0].graphql.user
}

export const extractTimeline = (profileData) => {
    return profileData.edge_owner_to_timeline_media.edges
        .map(mediaDataType)
}

export const scrapeProfile = async (username) => {
    const html = await fetchProfile(username)
    const profileData = extractProfileData(html)
    const timeline = extractTimeline(profileData)
    
    delete(profileData.edge_owner_to_timeline_media)
    
    return {
        timeline,
        profile: profileDataType(profileData),
    }
}
