const books = require('./books')

module.exports = {
  users: [
    {
      token: 'token_bhje73bkj38jlds9',
      data: {
        username: 'admin',
        firstName: 'Admin',
        age: 18,
      },
      auth: {
        username: 'admin',
        password: '1234',
      }
    }
  ],

  books: books.main,
  books_expanded: books.expanded,
}