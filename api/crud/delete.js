const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return utils.error(res, 403, 'Access is denied')
  
  const { id } = req.params
  const item = db.get('books').find({ id }).value()
  const item_expanded = db.get('books_expanded').find({ id }).value()
  if (!item || !item_expanded) return utils.error(res, 404, 'cannot find books with this id')

  db.get('books').remove({ id }).write()
  db.get('books_expanded').remove({ id }).write()
  
  res.send({
    id: item.id,
    success: true
  })
}