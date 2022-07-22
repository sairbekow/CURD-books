import {validate} from "../utils/validate";
import {_API_URL} from "../data/consts";
import HttpRequests from "../utils/httpRequests";
import {redirect} from "../utils/redirect";
import {spinner} from "../utils/spinner";

// isFavorite: boolean
// publishYear: number
// publishHouse: string
// pagesNumber: number
// genres: array of string
// originalLanguage: string

class AddBook {
  title = document.querySelector('.add-book__input-title input')
  author = document.querySelector('.add-book__input-author input')
  publishYear = document.querySelector('.add-book__input-publish-house input')
  publishHouse = document.querySelector('.add-book__input-publish-year input')
  pagesNumber = document.querySelector('.add-book__input-pages input')
  genres = document.querySelector('.add-book__input-genres input')
  originalLanguage = document.querySelector('.add-book__input-original-language input')
  form = document.querySelector('.add-book__form')

  isAllFieldsValid = true

  request = new HttpRequests()

  initialize = () => {
    this.title && this.title.addEventListener('input', () => {
      this.isAllFieldsValid = validate(this.title)
    })
    this.author && this.author.addEventListener('input', () => {
      this.isAllFieldsValid = validate(this.author)
    })
    this.form && this.form.addEventListener('submit', this.submit)
  }

  submit = (e) => {
    e.preventDefault()

    this.isAllFieldsValid = validate(this.title)
    this.isAllFieldsValid = validate(this.author)

    console.log(this.isAllFieldsValid)

    if (this.isAllFieldsValid) {
      spinner(true)

      this.request.post(`${_API_URL}/books/create`, {
          name: this.title.value,
          author: this.author.value,
          publishYear: Number(this.publishYear.value),
          publishHouse: this.publishHouse.value,
          pagesNumber: Number(this.pagesNumber.value),
          genres: this.genres.value.split(','),
          originalLanguage: this.originalLanguage.value
        }, true
      ).then(() => location.assign('./bookList.html'))
    }
  }
}

export default AddBook