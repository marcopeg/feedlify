/**
 * Receives the list of data files in a feed and calculates the
 * min/max dates of the entire feed lifespan
 */

export const getIndexDatespan = (items) => {
    if (!items.length) {
        return [ null, null ]
    }

    const localItems = [...items]
    localItems.sort((a, b) => b.ctime - a.ctime)

    const maxItem = localItems.shift()
    const minItem = localItems.pop()

    const max = maxItem.to
    const min = minItem ? minItem.from : maxItem.from
    
    return [
        min,
        max
    ]
}