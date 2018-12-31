function locator(value, fromIndex) {
  return value.indexOf('@', fromIndex)
}

function tokenizeCitation(eat, value, silent) {
  const match = /@(\w+)/.exec(value)

  if (match) {
    if (silent) {
      return true
    }
  }

  return eat(match[0])({
    type: 'link',
    children: {
      type: 'text',
      url: '#' + match[1],
      value: match[1]
    }
  })
}

tokenizeCitation.locator = locator

export default function() {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.inlineTokenizers
  const methods = Parser.prototype.inlineMethods
  tokenizers.citation = tokenizeCitation
  methods.splice(methods.indexOf('link'), 0, 'citation')
}
