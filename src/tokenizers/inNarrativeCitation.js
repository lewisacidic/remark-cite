import { itemIdRegex, labelRegex, locatorRegex } from './regexes'

const tokenize = (eat, value, silent) => {
  const regex = new RegExp(
    `@(${itemIdRegex}) ?(?:\\[(${labelRegex}) ?(${locatorRegex})\\])?`
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

tokenize.locator = function(value, fromIndex) {
  return value.indexOf('@', fromIndex)
}

export default tokenize
