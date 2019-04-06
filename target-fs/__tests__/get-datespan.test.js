import { getDatespan } from '../lib/get-datespan'

describe('getDatespan', () => {
    const fixture = require('./fixtures/aggregate-feed.json')
    let timeline = null

    beforeEach(() => {
        timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
    })

    test('it should provide min/max date', () => {
        const [ min, max ] = getDatespan(timeline)
        expect(max).toEqual(new Date('2019-04-05T16:07:26.000Z'))
        expect(min).toEqual(new Date('2019-03-02T18:20:20.000Z'))
    })

    test('it should work with a sinlge item', () => {
        const [ min, max ] = getDatespan([ timeline[0] ])
        expect(min).toEqual(max)
        expect(min).toEqual(new Date('2019-04-05T16:07:26.000Z'))
    })

    test('it should work with zero items', () => {
        const [ min, max ] = getDatespan([])
        expect(min).toEqual(max)
        expect(min).toBe(null)
    })
})
