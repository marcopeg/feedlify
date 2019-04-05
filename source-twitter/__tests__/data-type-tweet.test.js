import { tweetDataType } from '../lib/data-type-tweet'
import timelineFixture from './fixtures/timeline.json'

describe('tweetDataType', () => {
    test('it should implement the generic data structure', () => {
        timelineFixture
            .map(tweetDataType)
            .forEach(item => {
                expect(item.type).toBe('twitter::tweet')
                expect(item.title.length).toBeGreaterThan(5)
                expect(item.text.length).toBeGreaterThan(5)

                // delete(item.__meta)
                // console.log(item)
            })
    })

    test('it should calculate the author resource id', () => {
        const item = tweetDataType(timelineFixture[0])
        expect(item.author).toBe('twitter::thepeg')
    })

    test('it should implement a normal title for straight tweets', () => {
        const item = tweetDataType(timelineFixture[0])
        expect(item.title).toBe('Tweet by @thepeg')
    })

    test('it should use the first image as preview', () => {
        const item = tweetDataType(timelineFixture[0])
        expect(item.preview).toBe('https://pbs.twimg.com/media/D0OSGtyVAAAck4Z.jpg')
    })
    
    test('it should use the first url as main url', () => {
        const item = tweetDataType(timelineFixture[0])
        expect(item.url).toBe('https://github.com/marcopeg/docker-vacuum')
    })

    test('it should fallback the url to the twitter status page', () => {
        const item = tweetDataType(timelineFixture[1])
        expect(item.url).toBe('https://twitter.com/kuizinas/status/1107954517004484609')
    })

    test('it should provide a javascript date', () => {
        const item = tweetDataType(timelineFixture[0])
        expect(item.ctime).toBeInstanceOf(Date)
        expect(item.ctime.toISOString()).toBe(item.__meta.time)
    })
})
