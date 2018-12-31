import cite from '../index'
import parse from 'remark-parse'

describe('remark-cite', () => {
  it('processes an in-text citation', () => {
    const res = parse.use(cite).parse('@test')
    expect(res).toMatchObject({
      children: [
        {
          children: [
            {
              children: {
                type: 'text',
                url: '#test',
                value: 'test'
              },
              type: 'link'
            }
          ],
          type: 'paragraph'
        }
      ],
      type: 'root'
    })
  })
})
