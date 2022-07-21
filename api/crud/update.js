const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return utils.error(res, 403, 'Access is denied')
  
  const { id } = req.params
  const { name, author, isFavorite, publishYear, publishHouse, pagesNumber, genres, originalLanguage } = req.body
  const permisbleKeys = 'name, author, isFavorite, publishYear, publishHouse, pagesNumber, genres, originalLanguage'.split(', ')

  const book = db.get('books').find({ id }).value()
  const book_expanded = db.get('books_expanded').find({ id }).value()
  if (!book || !book_expanded) return utils.error(res, 404, 'cannot find book with this id')

  const keys = Object.keys(req.body)
  const invalid = keys.filter(k => !permisbleKeys.includes(k))
  if (invalid.length) {
    return utils.error(res, 400, `${invalid.join(', ')} is not valid keys`)
  }

  if (name && typeof name !== 'string') return utils.error(res, 400, 'name attribute should be type `string`')
  if (author && typeof author !== 'string') return utils.error(res, 400, 'author attribute should be type `string`')
  if (isFavorite && typeof isFavorite !== 'boolean') return utils.error(res, 400, 'isFavorite attribute should be type `boolean`')
  if (publishYear && typeof publishYear !== 'number') return utils.error(res, 400, 'publishYear attribute should be type `number`')
  if (publishHouse && typeof publishHouse !== 'boolean') return utils.error(res, 400, 'publishHouse attribute should be type `string`')
  if (pagesNumber && typeof pagesNumber !== 'number') return utils.error(res, 400, 'pagesNumber attribute should be type `number`')
  if (genres && !Array.isArray(genres)) return utils.error(res, 400, 'genres attribute should be type `array`')
  if (originalLanguage && typeof originalLanguage !== 'string') return utils.error(res, 400, 'originalLanguage attribute should be type `string`')

  const updatedItem = { ...book_expanded, ...req.body }
  const not_expanded = Object.assign({}, updatedItem)
  delete not_expanded['publishYear']
  delete not_expanded['publishHouse']
  delete not_expanded['pagesNumber']
  delete not_expanded['genres']
  delete not_expanded['originalLanguage']

  db.get('books').find({ id }).assign(not_expanded).write()
  db.get('books_expanded').find({ id }).assign(updatedItem).write()

  res.send(updatedItem)
}