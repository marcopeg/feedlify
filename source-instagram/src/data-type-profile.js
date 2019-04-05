
export const profileDataType = (data) => {
    const profile = {
        id: `instagram::${data.username}`,
        username: data.username,
        pic: data.profile_pic_url,
        url: `https://instagram.com/${data.username}`,
        __meta: { ...data },
    }

    // remove unecessary original data
    delete(profile.__meta.edge_owner_to_timeline_media)
    delete(profile.__meta.edge_felix_video_timeline)
    delete(profile.__meta.edge_saved_media)
    delete(profile.__meta.edge_media_collections)

    return profile
}
