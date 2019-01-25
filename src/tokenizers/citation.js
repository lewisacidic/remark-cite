import { itemIdRegex, labelRegex, locatorRegex } from './regexes'
import { stripUndef } from '../utils'

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
  const item = stripUndef({ prefix, id, label, locator, suffix })

  return eat(token)({
    type: 'Citation',
    citation: {
      citationItems: [item],
      properties: { 'in-narrative': false }
    }
  })
}

tokenize.locator = function(value, fromIndex) {
  return value.indexOf('[', fromIndex)
}

export default tokenize
