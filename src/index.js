const labelRegex = [
  'book',
  'chapter',
  'column',
  'figure',
  'folio',
  'issue',
  'line',
  'note',
  'opus',
  'page',
  'paragraph',
  'part',
  'section',
  'sub verbo',
  'verse',
  'volume'
].join('|')

const citeIdRegex = '[^\\s]+[A-z0-9]'
const locatorRegex = '[0-9-, ]*[0-9]'

function tokenizeCitation(eat, value, silent) {
  const regex = new RegExp(
    `\\[(.*)@(${citeIdRegex})(?:, ?(${labelRegex}) ?(${locatorRegex}))?(.*)?\\]`
  )
  const match = regex.exec(value)

  if (!match) {
    return null
  }
  if (silent) {
    return true
  }

  const [token, prefix, id, label, locator, suffix] = match
  return eat(token)({
    type: 'citation',
    citation: {
      citationItems: [{ prefix, id, label, locator, suffix }]
    }
  })
}

tokenizeCitation.locator = function(value, fromIndex) {
  return value.indexOf('[', fromIndex)
}

function tokenizeNarrativeCitation(eat, value, silent) {
  const regex = new RegExp(
    `@(${citeIdRegex}) ?(?:\\[(${labelRegex}) ?(${locatorRegex})\\])?`
  )
  const match = regex.exec(value)
  if (!match) {
    return
  }

  if (silent) {
    return true
  }

  const [token, id, label, locator] = match

  return eat(token)({
    type: 'citation',
    citation: {
      citationItems: [{ id, label, locator }],
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
  tokenizers.citation = tokenizeCitation
  tokenizers.narrativeCitation = tokenizeNarrativeCitation
  methods.splice(methods.indexOf('link'), 0, 'citation', 'narrativeCitation')
}
