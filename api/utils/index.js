const error = (res, status, text) => res.status(status).json(text).end()

module.exports = {
  error
}