import remark from 'remark'
import locale from 'locale-en-gb'
import style from 'style-vancouver'

import cite from '../index'
import items from './references'

describe('transform', () => {
  const run = x =>
    remark()
      .use(cite, { items, locale, style })
      .runSync(x)

  const makeCitation = (
    { id = 'test', inNarrative = false } = { id: 'test', inNarrative: false }
  ) => ({
    type: 'Citation',
    citation: {
      citationItems: [{ id }],
      properties: {
        'in-narrative': inNarrative
      }
    }
  })

  const footnote = { type: 'Footnote' }

  const footnoteReference = { type: 'FootnoteReference' }

  it('adds a note index to a citation', () => {
    expect(
      run({
        type: 'root',
        children: [makeCitation()]
      }).children[0].citation.properties.noteIndex
    ).toEqual(0)
  })

  it('increments the note index if a citation is before', () => {
    const result = run({
      type: 'root',
      children: [makeCitation(), makeCitation()]
    })
    expect(result.children[0].citation.properties.noteIndex).toEqual(0)
    expect(result.children[1].citation.properties.noteIndex).toEqual(1)
  })

  it('increments the note index if a footnote is before', () => {
    expect(
      run({
        type: 'root',
        children: [footnote, makeCitation()]
      }).children[1].citation.properties.noteIndex
    ).toEqual(1)
  })

  it('increments the note index if a footnote reference is before', () => {
    expect(
      run({
        type: 'root',
        children: [footnoteReference, makeCitation()]
      }).children[1].citation.properties.noteIndex
    ).toEqual(1)
  })

  it('adds the value of a citation', () => {
    expect(
      run({
        type: 'root',
        children: [makeCitation()]
      }).children[0].citation.value
    ).toEqual('(1)')
  })

  it('adds the value of an in narrative citation', () => {
    expect(
      run({
        type: 'root',
        children: [makeCitation({ inNarrative: true })]
      }).children[0].citation.value
    ).toEqual('Reference 1')
  })

  it('adds the value of multiple citations', () => {
    const result = run({
      type: 'root',
      children: [makeCitation({ id: 'test' }), makeCitation({ id: 'test2' })]
    })
    expect(result.children[0].citation.value).toEqual('(1)')
    expect(result.children[1].citation.value).toEqual('(2)')
  })

  it('repeats the citation of the same source', () => {
    const result = run({
      type: 'root',
      children: [
        makeCitation({ id: 'test' }),
        makeCitation({ id: 'test2' }),
        makeCitation({ id: 'test' })
      ]
    })
    expect(result.children[0].citation.value).toEqual('(1)')
    expect(result.children[1].citation.value).toEqual('(2)')
    expect(result.children[0].citation.value).toEqual('(1)')
  })
})
