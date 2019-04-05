
export const profileDataType = (profile) => {
    return {
        id: `twitter::${profile.screenName}`,
        username: profile.screenName,
        pic: profile.profileImage,
        url: `https://twitter.com/${profile.screenName}`,
        __meta: profile,
    }
}
