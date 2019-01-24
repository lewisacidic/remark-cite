import remark from 'remark'

import cite from '../index'

describe('remark-cite', () => {
  let parse
  beforeEach(() => {
    parse = remark().use(cite).parse
  })

  it('parses an in-narrative citation', () => {
    expect(parse('@test')).toMatchObject({
      children: [
        {
          children: [
            {
              type: 'citation',
              citation: {
                citationItems: [{ id: 'test' }],
                properties: { 'in-narrative': true }
              }
            }
          ],
          type: 'paragraph'
        }
      ],
      type: 'root'
    })
  })

  it('parses options for in-narrative citations', () => {
    expect(parse('@test [p. 1]')).toMatchObject({
      children: [
        {
          children: [
            {
              type: 'citation',
              citation: {
                citationItems: [{ id: 'test', locator: 'p. 1' }],
                properties: { 'in-narrative': true }
              }
            }
          ]
        }
      ]
    })
  })

  it('optionally allows no space for in-narrative citations', () => {
    expect(parse('@test[p. 1]')).toMatchObject({
      children: [
        {
          children: [
            {
              type: 'citation',
              citation: {
                citationItems: [{ id: 'test', locator: 'p. 1' }],
                properties: { 'in-narrative': true }
              }
            }
          ]
        }
      ]
    })
  })
})
