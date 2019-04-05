import { getHashtags } from './get-hashtags'

const getMediaCaption = (item) => {
    try {
        return item.node.edge_media_to_caption.edges[0].node.text
    } catch (err) {
        return ''
    }
}

export const mediaDataType = (item) => {
    const text = getMediaCaption(item)
    return {
        type: 'instagram::media',
        author: `instagram::${item.node.owner.username}`,
        origin: `instagram::${item.node.owner.username}`,
        ctime: new Date(item.node.taken_at_timestamp * 1000),
        title: `Media by @${item.node.owner.username}`,
        text,
        url: `https://www.instagram.com/p/${item.node.shortcode}/`,
        preview: item.node.thumbnail_src,
        hashtags: getHashtags(text),
        __meta: item.node,
    }
}
