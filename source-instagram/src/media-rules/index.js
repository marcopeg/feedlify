import { ruleTag } from './rule-tag'

const rulesMap = {
    tag: ruleTag,
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
