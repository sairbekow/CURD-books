import HttpRequests from "../utils/httpRequests";
import {_API_URL, _USER} from "../data/consts";
import {disableButton} from "../utils/disableButton";
import {spinner} from "../utils/spinner";

class BookInfo {
  editBookBtn = document.querySelector('.book-info__btn')
  deleteBookBtn = document.querySelector('.book-info__delete-btn')
  favoriteBookBtn = document.querySelector('.book-info__favorite-btn')

  book = null

  bookId  = (new URL(document.location)).searchParams.get('id')

  initialize = () => {
    if (window.location.pathname === '/bookInfo.html') {
      this.getBook()
      this.setUserName()
    }
    this.deleteBookBtn && this.deleteBookBtn.addEventListener('click', this.deleteBook)
    this.favoriteBookBtn && this.favoriteBookBtn.addEventListener('click', this.makeFavorite)
    this.editBookBtn && this.editBookBtn.addEventListener('click', this.onCLickEditBook)
  }

  onCLickEditBook = () => {
    disableButton(this.editBookBtn)
    spinner(true)
    location.assign(`./editBook.html?id=${this.bookId}`)
  }

  deleteBook = () => {
    if (confirm('Вы точно хотите удалить эту книгу?')) {
      new HttpRequests().delete(`${_API_URL}/books/delete/${this.bookId}`)
      location.assign('./bookList.html')
    }
  }

  makeFavorite = (e) => {
    const isFavorite = this.book.isFavorite

    new HttpRequests().put(`${_API_URL}/books/update/${this.bookId}`, {isFavorite: !isFavorite})

    e.target.closest('button').classList.toggle('favorite')
  }

  setUserName = () => {
    const usernameEl = document.querySelector('.user__name')
    usernameEl.textContent = _USER
  }

  render = (book) => {
    const name = document.querySelector('.book-info__content-title')
    const author = document.querySelector('.book-info__author')
    const publishHouse = document.querySelector('.book-info__publish-house span')
    const originalLanguage = document.querySelector('.book-info__original-language span')
    const publishYear = document.querySelector('.book-info__publish-year span')
    const pagesNumber = document.querySelector('.book-info__page-number span')
    const genres = document.querySelector('.book-info__genres span')

    name.textContent = book.name ? book.name : 'нет информации'
    author.textContent = book.author ? book.author : 'нет информации'
    publishYear.textContent = book.publishYear ? book.publishYear : 'нет информации'
    pagesNumber.textContent = book.pagesNumber ? book.pagesNumber : 'нет информации'
    originalLanguage.textContent = book.originalLanguage ? book.originalLanguage : 'нет информации'
    publishHouse.textContent = book.publishHouse ? book.publishHouse : 'нет информации'
    genres.textContent = book.genres.length > 0 ? book.genres.join(', ') : 'нет информации'

    book.isFavorite && this.favoriteBookBtn.classList.add('favorite')
  }

  getBook = () => {
    const id = (new URL(document.location)).searchParams.get('id')

    new HttpRequests().get(`${_API_URL}/books/${id}`)
      .then(res => {
        this.render(res)
        this.book = res
        console.log(res)
      })
  }
}

export default BookInfo