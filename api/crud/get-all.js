const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return utils.error(res, 403, 'Access is denied')

  const books = db.get('books')
  res.send(books)
}