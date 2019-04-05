import hashtagRegex from 'hashtag-regex'

export const getHashtags = (text) => {
    const regex = hashtagRegex()
    const matches = []
    let match

    while (match = regex.exec(text)) {
        matches.push(match[0].substr(1))
    }

    return matches
}
