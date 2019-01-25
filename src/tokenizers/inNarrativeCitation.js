import { itemIdRegex, labelRegex, locatorRegex } from './regexes'
import { stripUndef } from '../utils'

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

  const item = stripUndef({ id, label, locator })
  return eat(token)({
    type: 'Citation',
    citation: {
      citationItems: [item],
      properties: { 'in-narrative': true }
    }
  })
}

tokenize.locator = function(value, fromIndex) {
  return value.indexOf('@', fromIndex)
}

export default tokenize
