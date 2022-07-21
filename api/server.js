const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 1717

const defaultData = require('./db/defaultData')
const auth = require('./auth')
const books = require('./crud')
const db = require('./db')

app.use(cors())
db.defaults(defaultData).write()

app.use(express.json()) 

app.get('/me', auth.me)
app.post('/login', auth.login)
app.post('/signin', auth.signin)

app.get('/books', books.getAll)
app.get('/books/:id', books.getItem)
app.post('/books/create', books.createNew)
app.put('/books/update/:id', books.updateItem)
app.delete('/books/delete/:id', books.deleteItem)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))