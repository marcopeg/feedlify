import { getFeedDatespan } from '../lib/get-datespan-feed'
import { getIndexDatespan } from '../lib/get-datespan-index'

describe('getDatespan', () => {
    describe('getFeedDatespan', () => {
        const fixture = require('./fixtures/aggregate-feed.json')
        let timeline = null

        beforeEach(() => {
            timeline = fixture.timeline.map(item => ({ ...item, ctime: new Date(item.ctime)}))
        })

        test('it should provide min/max date', () => {
            const [ min, max ] = getFeedDatespan(timeline)
            expect(max).toEqual(new Date('2019-04-05T16:07:26.000Z'))
            expect(min).toEqual(new Date('2019-03-02T18:20:20.000Z'))
        })

        test('it should work with a sinlge item', () => {
            const [ min, max ] = getFeedDatespan([ timeline[0] ])
            expect(min).toEqual(max)
            expect(min).toEqual(new Date('2019-04-05T16:07:26.000Z'))
        })

        test('it should work with zero items', () => {
            const [ min, max ] = getFeedDatespan([])
            expect(min).toEqual(max)
            expect(min).toBe(null)
        })
    })

    describe('getIndexDatespan', () => {
        test('it should provide min/max', () => {
            const [ min, max ] = getIndexDatespan([
                {
                    ctime: new Date('2019-04-06T08:42:01.392Z'),
                    from: new Date('2019-04-02T08:42:01.392Z'),
                    to: new Date('2019-04-06T08:42:01.392Z'),
                },
                {
                    ctime: new Date('2019-03-06T08:42:01.392Z'),
                    from: new Date('2019-03-02T08:42:01.392Z'),
                    to: new Date('2019-03-06T08:42:01.392Z'),
                }
            ])
            
            expect(min).toEqual(new Date('2019-03-02T08:42:01.392Z'))
            expect(max).toEqual(new Date('2019-04-06T08:42:01.392Z'))
        })

        test('it should provide min/max with just one record', () => {
            const [ min, max ] = getIndexDatespan([
                {
                    ctime: new Date('2019-04-06T08:42:01.392Z'),
                    from: new Date('2019-04-02T08:42:01.392Z'),
                    to: new Date('2019-04-06T08:42:01.392Z'),
                },
            ])
            
            expect(min).toEqual(new Date('2019-04-02T08:42:01.392Z'))
            expect(max).toEqual(new Date('2019-04-06T08:42:01.392Z'))
        })

        test('it should work without records', () => {
            const [ min, max ] = getIndexDatespan([])
            
            expect(min).toBe(null)
            expect(max).toBe(null)
        })
    })
})
