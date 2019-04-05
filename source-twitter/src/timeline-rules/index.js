import { ruleUsername } from './rule-username'

const rulesMap = {
    username: ruleUsername,
}

const getRuleFn = (rule) =>
    rulesMap[rule.rule] || (() => false)

export const applyExcludeRules = (rules) => (tweet) =>
    !rules.some(rule => {
        try {
            return getRuleFn(rule)(tweet, rule)
        } catch (err) {
            return false
        }
    })
