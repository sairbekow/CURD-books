const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const { username, password } = req.body
  if (!username) return utils.error(res, 400, 'username attribute is required')
  if (!password) return utils.error(res, 400, 'password attribute is required')

  const user = db.get('users').find({ auth: { username, password } }).value()
  
  if (!user) return utils.error(res, 403, 'incorrect login data')

  res.send({ token: user.token, data: user.data })
}