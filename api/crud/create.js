const shortid = require('shortid')

const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return utils.error(res, 403, 'Access is denied')
  
  const { name, author, isFavorite, publishYear, publishHouse, pagesNumber, genres, originalLanguage } = req.body
  const permisbleKeys = 'name, author, isFavorite, publishYear, publishHouse, pagesNumber, genres, originalLanguage'.split(', ')

  const keys = Object.keys(req.body)
  const invalid = keys.filter(k => !permisbleKeys.includes(k))
  if (invalid.length) {
    return utils.error(res, 400, `${invalid.join(', ')} is not valid keys`)
  }

  if (!name) return utils.error(res, 400, '`name` attribute is required')
  if (!author) return utils.error(res, 400, '`author` attribute is required')

  if (typeof name !== 'string') return utils.error(res, 400, 'name attribute should be type `string`')
  if (typeof author !== 'string') return utils.error(res, 400, 'author attribute should be type `string`')
  if (isFavorite && typeof isFavorite !== 'boolean') return utils.error(res, 400, 'isFavorite attribute should be type `boolean`')
  if (publishYear && typeof publishYear !== 'number') return utils.error(res, 400, 'publishYear attribute should be type `number`')
  if (publishHouse && typeof publishHouse !== 'string') return utils.error(res, 400, 'publishHouse attribute should be type `string`')
  if (pagesNumber && typeof pagesNumber !== 'number') return utils.error(res, 400, 'pagesNumber attribute should be type `number`')
  if (genres && !Array.isArray(genres)) return utils.error(res, 400, 'genres attribute should be type `array`')
  if (originalLanguage && typeof originalLanguage !== 'string') return utils.error(res, 400, 'originalLanguage attribute should be type `string`')

  const newBook = { 
    name,
    author,
    id: shortid.generate(),
    isFavorite: isFavorite || false,
  }
  const expanded = {
    publishYear: publishYear || null,
    publishHouse: publishHouse || null, 
    pagesNumber: pagesNumber || 0,
    genres: genres || [],
    originalLanguage: originalLanguage || null
  }

  db.get('books').push(newBook).write()
  db.get('books_expanded').push({ ...newBook, ...expanded }).write()
  res.send({ ...newBook, ...expanded })
}