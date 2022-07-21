const shortid = require('shortid')

const db = require('../db')
const utils = require('../utils')

module.exports = (req, res) => {
  const { username, password, firstName, age } = req.body
  if (!username) return utils.error(res, 400, 'username attribute is required')
  if (!password) return utils.error(res, 400, 'password attribute is required')

  const existed = db.get('users').find({ data: { username } }).value()
  if (existed) return utils.error(res, 400, 'user with this username already exists')

  const user = { 
    auth: { username, password },
    data: { username, firstName, age },
    token: `token_${shortid.generate()}` 
  }

  db.get('users').push(user).write()
  res.send({ token: user.token, data: user.data })
}