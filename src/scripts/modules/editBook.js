import HttpRequests from "../utils/httpRequests";
import {_API_URL} from "../data/consts";
import {spinner} from "../utils/spinner";

class EditBook {
  formSubmit = document.querySelector('.edit-book__form')
  allInputs = document.querySelectorAll('.edit-book__input')
  favoriteBtn = document.querySelector('#edit-book__favorite')
  deleteBtn = document.querySelector('.edit-book__delete-btn')

  bookId = (new URL(document.location)).searchParams.get('id')

  initialize = () => {
    this.formSubmit && this.formSubmit.addEventListener('submit', this.submit)
    this.deleteBtn && this.deleteBtn.addEventListener('click', this.delete)
  }

  onSaveChanges = () => {
    spinner(true)
    location.assign(`./bookList.html`)
  }

  delete = () => {
    if (confirm('Вы точно хотите удалить эту книгу?')) {
      new HttpRequests().delete(`${_API_URL}/books/delete/${this.bookId}`)
      location.assign('./bookList.html')
    }
  }

  submit = (e) => {
    e.preventDefault()
    const reqObj = {}

    this.allInputs.forEach(item => {
      if (item.value.trim()) {
        if (item.getAttribute('type') === 'number') {
          reqObj[item.dataset.property] = Number(item.value)
        } else if (item.dataset.property === 'genres') {
          reqObj[item.dataset.property] = item.value.split(',')
        } else {
          reqObj[item.dataset.property] = item.value
        }
      }
    })

    reqObj.isFavorite = this.favoriteBtn.checked

    console.log(reqObj)

    new HttpRequests().put(`${_API_URL}/books/update/${this.bookId}`, reqObj)
    this.onSaveChanges()
  }
}

export default EditBook