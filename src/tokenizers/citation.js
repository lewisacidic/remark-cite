import { itemIdRegex, labelRegex, locatorRegex } from './regexes'

const tokenize = (eat, value, silent) => {
  const regex = new RegExp(
    `\\[(.*)@(${itemIdRegex})(?:, ?(${labelRegex}) ?(${locatorRegex}))?(.*)?\\]`
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

tokenize.locator = function(value, fromIndex) {
  return value.indexOf('[', fromIndex)
}

export default tokenize
