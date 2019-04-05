/**
 * Exclude tags by name
 * case insensitive
 *
 * @param {*} media 
 * @param {*} rule 
 */
export const ruleTag = (media, rule) => {
    const hashtags = media.hashtags.map(tag => tag.toLowerCase())
    if (typeof rule.value === 'string') {
        return hashtags.includes(rule.value.toLowerCase())
    } else {
        return rule.value
            .map(value => value.toLowerCase())
            .some(value => hashtags.includes(value))
    }
}
