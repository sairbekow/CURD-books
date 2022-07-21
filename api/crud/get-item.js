const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return utils.error(res, 403, 'Access is denied')

  const { id } = req.params
  const book = db.get('books_expanded').find({ id }).value()
  if (!book) return utils.error(res, 404, 'cannot find book with this id')
  
  res.send(book)
}