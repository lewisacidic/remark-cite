import tokenizeCitation from './tokenizers/citation'
import tokenizeInNarrativeCitation from './tokenizers/inNarrativeCitation'

export default function() {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.inlineTokenizers
  const methods = Parser.prototype.inlineMethods
  tokenizers.citation = tokenizeCitation
  tokenizers.inNarrativeCitation = tokenizeInNarrativeCitation
  methods.splice(methods.indexOf('link'), 0, 'citation', 'inNarrativeCitation')
}
