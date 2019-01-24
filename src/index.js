function tokenizeNarrativeCitation(eat, value, silent) {
  const [token, id, annotations] = /@(\w+) ?(?:\[(.+)\])?/.exec(value)

  if (id) {
    if (silent) {
      return true
    }
  }
  const locator = annotations

  return eat(token)({
    type: 'citation',
    citation: {
      citationItems: [{ id, locator }],
      properties: { 'in-narrative': true }
    }
  })
}

tokenizeNarrativeCitation.locator = function(value, fromIndex) {
  return value.indexOf('@', fromIndex)
}

export default function() {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.inlineTokenizers
  const methods = Parser.prototype.inlineMethods
  tokenizers.narrativeCitation = tokenizeNarrativeCitation
  methods.splice(methods.indexOf('link'), 0, 'narrativeCitation')
}
