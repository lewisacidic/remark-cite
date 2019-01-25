import tokenizeCitation from './tokenizers/citation'
import tokenizeInNarrativeCitation from './tokenizers/inNarrativeCitation'
import visit from 'unist-util-visit'
import is from 'unist-util-is'

export default attacher

function attacher() {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.inlineTokenizers
  const methods = Parser.prototype.inlineMethods
  tokenizers.citation = tokenizeCitation
  tokenizers.inNarrativeCitation = tokenizeInNarrativeCitation
  methods.splice(methods.indexOf('link'), 0, 'citation', 'inNarrativeCitation')
  return transformer

  function transformer(tree) {
    const citations = []
    visit(tree, ['Footnote', 'FootnoteReference', 'Citation'], (node, i) => {
      if (is('Citation', node)) node.citation.properties.noteIndex = i
      citations.push(node)
    })
  }
}
