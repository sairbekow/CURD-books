import HttpRequests from "../utils/httpRequests";
import {_ALL_BOOKS, _API_URL, _USER} from "../data/consts";
import {spinner} from "../utils/spinner";
import {disableButton} from "../utils/disableButton";

class BookList {
  logoutBtn = document.querySelector('.logout')
  addBookBtn = document.querySelector('.books__add-btn')


  initialize = () => {
    if (window.location.pathname === '/bookList.html') {
      this.render()
    }
    this.logoutBtn && this.logoutBtn.addEventListener('click', this.onLogout)
    this.addBookBtn && this.addBookBtn.addEventListener('click', this.onAddBook)
  }


  onAddBook = () => {
    spinner(true)
    disableButton(this.addBookBtn)
    location.assign('./addBook.html')
  }

  render = () => {
    this.renderBook()
    this.setUserName()
  }

  setUserName = () => {
    const usernameEl = document.querySelector('.user__name')
    usernameEl.textContent = _USER
  }

  onLogout = () => {
    disableButton(this.logoutBtn)
    spinner(true)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentUserToken')
    location.assign('./index.html')
  }

  renderBook = () => {
    spinner(true)
    const list = document.querySelector('.books__list')
    const req = new HttpRequests()

    req.get(`${_API_URL}/books`)
      .then(res => {
        res.forEach(item => {
          const book = this.createBook(item.name, item.author, item.isFavorite, item.id)
          list.append(book)
          spinner(false)
        })
      })
  }

  onClickBook = (e) => {
    if(!e.target.closest('.book__btn')) {
      const id = e.target.closest('.book').dataset.id
      location.assign(`./bookInfo.html?id=${id}`)
    }
  }

  makeFavorite = (e) => {
    const book = e.target.closest('.book')
    let isFavorite = book.classList.contains('favorite')

    new HttpRequests().put(`${_API_URL}/books/update/${book.dataset.id}`, {isFavorite : !isFavorite})

    e.target.closest('.book').classList.toggle('favorite')
  }

  deleteBook = (e) => {
    if (confirm('Вы точно хотите удалить эту книгу?')) {
      const book = e.target.closest('.book')
      book.remove()

      new HttpRequests().delete(`${_API_URL}/books/delete/${book.dataset.id}`)
    }
  }

  createBook = (bookTitle, bookAuthor, isFavorite, id) => {
    const li = document.createElement('li')
    const left = document.createElement('div')
    const right = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const favoriteBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    li.classList.add('book__item')
    li.classList.add('book')
    left.classList.add('book__left')
    right.classList.add('book__right')
    title.classList.add('book__title')
    author.classList.add('book__author')
    favoriteBtn.classList.add('book__btn')
    favoriteBtn.classList.add('book__favorite-btn')
    deleteBtn.classList.add('book__btn')
    deleteBtn.classList.add('book__delete-btn')

    author.textContent = bookAuthor
    title.textContent = bookTitle
    li.dataset.id = id

    isFavorite && li.classList.add('favorite')

    favoriteBtn.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="#EDEDED"/>
        <path d="M29.3762 13.5401C28.5386 11.8252 26.1258 10.4221 23.3191 11.239C21.9779 11.6255 20.8078 12.4543 19.9999 13.59C19.1919 12.4543 18.0218 11.6255 16.6806 11.239C13.8677 10.4346 11.4611 11.8252 10.6235 13.5401C9.44831 15.9409 9.93588 18.6411 12.0737 21.5658C13.7489 23.8544 16.143 26.1742 19.6186 28.8681C19.7284 28.9536 19.8637 29 20.003 29C20.1423 29 20.2776 28.9536 20.3874 28.8681C23.8567 26.1804 26.257 23.8793 27.9323 21.5658C30.0638 18.6411 30.5514 15.9409 29.3762 13.5401Z" fill="#B1B1B1"/>
        </svg>`
    deleteBtn.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="#EDEDED"/>
      <path d="M29.1667 13.6H25.8333V11.6C25.8333 10.7175 25.0859 10 24.1667 10H15.8333C14.9141 10 14.1667 10.7175 14.1667 11.6V13.6H10.8333C10.3724 13.6 10 13.9575 10 14.4V15.2C10 15.31 10.0937 15.4 10.2083 15.4H11.7812L12.4245 28.475C12.4661 29.3275 13.2005 30 14.0885 30H25.9115C26.8021 30 27.5339 29.33 27.5755 28.475L28.2187 15.4H29.7917C29.9062 15.4 30 15.31 30 15.2V14.4C30 13.9575 29.6276 13.6 29.1667 13.6ZM23.9583 13.6H16.0417V11.8H23.9583V13.6Z" fill="#B1B1B1"/>
      </svg>`

    right.append(favoriteBtn, deleteBtn)
    left.append(title, author)
    li.append(left, right)

    deleteBtn.addEventListener('click', this.deleteBook)
    favoriteBtn.addEventListener('click', this.makeFavorite)
    li.addEventListener('click', this.onClickBook)

    return li
  }
}


export default BookList