import remark from 'remark'
import cite from '..'

describe('tokenize', () => {
  let parse
  beforeEach(() => {
    parse = x =>
      remark()
        .use(cite)
        .parse(x).children[0].children[0]
  })
  describe('citation', () => {
    it('parses a citation', () => {
      expect(parse('[@test]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test' }]
        }
      })
    })

    it('parses a citation with numbers in its id', () => {
      expect(parse('[@test42]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test42' }]
        }
      })
    })

    it('parses a citation with a hyphen in its id', () => {
      expect(parse('[@test-42]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test-42' }]
        }
      })
    })

    it('parses a citation with a dot in its id', () => {
      expect(parse('[@test.example]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test.example' }]
        }
      })
    })

    it('parses a citation with a url as id', () => {
      expect(parse('[@https://example.com/test-citation]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'https://example.com/test-citation' }]
        }
      })
    })

    it('parses non citations', () => {
      expect(parse('not a citation')).toMatchObject({
        type: 'text',
        value: 'not a citation'
      })
      expect(parse('[not a citation](https://example.com)')).toMatchObject({
        type: 'link'
      })
      expect(parse('[not a '))
    })

    it('parses a citation with prefix', () => {
      expect(parse('[see @test]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test', prefix: 'see ' }]
        }
      })
    })

    it('parses a citation with label and locator', () => {
      expect(parse('[@test, page 1]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test', label: 'page', locator: '1' }]
        }
      })
    })

    it('parses a citation with suffix', () => {
      expect(parse('[@test and suffix]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test', suffix: ' and suffix' }]
        }
      })
    })

    it('parses a citation with everything', () => {
      expect(parse('[see @test, page 4-10, 20-30 and *passim*]')).toMatchObject(
        {
          type: 'Citation',
          citation: {
            citationItems: [
              {
                id: 'test',
                prefix: 'see ',
                label: 'page',
                locator: '4-10, 20-30',
                suffix: ' and *passim*'
              }
            ]
          }
        }
      )
    })
  })
  describe('in narrative citation', () => {
    it('parses an in-narrative citation', () => {
      expect(parse('@test')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test' }],
          properties: { 'in-narrative': true }
        }
      })
    })

    it('parses options for in-narrative citations', () => {
      expect(parse('@test [page 1]')).toMatchObject({
        type: 'Citation',
        citation: {
          citationItems: [{ id: 'test', label: 'page', locator: '1' }],
          properties: { 'in-narrative': true }
        }
      })
    })
  })
})
