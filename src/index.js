import visit from 'unist-util-visit'
import is from 'unist-util-is'
import Processor from 'simple-cite'

import tokenizeCitation from './tokenizers/citation'
import tokenizeInNarrativeCitation from './tokenizers/inNarrativeCitation'

export default attacher

function attacher({ items, locale, style } = {}) {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.inlineTokenizers
  const methods = Parser.prototype.inlineMethods
  tokenizers.citation = tokenizeCitation
  tokenizers.inNarrativeCitation = tokenizeInNarrativeCitation
  methods.splice(methods.indexOf('link'), 0, 'citation', 'inNarrativeCitation')
  return transformer

  function transformer(tree) {
    const proc = new Processor({ items, locale, style, format: 'text' })

    // register the citations in first pass
    visit(tree, ['Footnote', 'FootnoteReference', 'Citation'], (node, i) => {
      if (is('Citation', node)) {
        node.citation.properties.noteIndex = i
        node._citation = proc.cite(node.citation)
      }
    })
    // add the citation values in second pass
    visit(tree, 'Citation', node => {
      node.citation.value = node._citation.value
      delete node._citation
    })
  }
}
