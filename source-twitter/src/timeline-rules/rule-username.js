
export const ruleUsername = (tweet, rule) => {
    if (typeof rule.value === 'string') {
        return [rule.value].includes(tweet.screenName)
    } else {
        return rule.value.includes(tweet.screenName)
    }
}
