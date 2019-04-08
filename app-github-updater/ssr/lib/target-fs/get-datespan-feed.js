/**
 * Receives a timeline and should be able to extract the
 * min/max item date.
 * 
 */

export const getFeedDatespan = (items) => {
    if (!items.length) {
        return [ null, null ]
    }

    const localItems = [...items]
    localItems.sort((a, b) => b.ctime - a.ctime)

    const maxItem = localItems.shift()
    const minItem = localItems.pop()

    const max = maxItem ? maxItem.ctime : null
    const min = minItem ? minItem.ctime : null

    return [
        min || max,
        max
    ]
}
