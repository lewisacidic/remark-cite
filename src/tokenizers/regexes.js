export const labelRegex = [
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

export const itemIdRegex = '[^\\s]+[A-z0-9]'
export const locatorRegex = '[0-9-, ]*[0-9]'
