import HttpRequests from "../utils/httpRequests";
import {_API_URL} from "../data/consts";
import {validate} from "../utils/validate";
import {disableButton} from "../utils/disableButton";
import {spinner} from "../utils/spinner";

class SignUp {
  form = document.querySelector('.register__form')
  password = document.querySelector('.register__password-field')
  repeatPassword = document.querySelector('.register__repeat-password-field')
  username = document.querySelector('.register__username-field input')
  fields = document.querySelectorAll('.register__label input')
  repeatPasswordField = document.querySelector('.register__repeat-password-field input')
  allInputs = document.querySelectorAll('.register__input')
  submitBtn = document.querySelector('.register__btn')


  isAllFieldsValid = true

  initialize = () => {
    this.fields && this.fields.forEach(item => {
      item.addEventListener('input', () => this.isAllFieldsValid = validate(item))
    })
    this.form && this.form.addEventListener('submit', this.submit)
  }

  submit = (e) => {
    e.preventDefault()

    this.fields.forEach(item => {
      this.isAllFieldsValid = validate(item)
    })

    this.validatePassword()

    if (this.isAllFieldsValid) {
      disableButton(this.submitBtn)
      spinner(true)
      this.signUpNewUser()
    }
  }

  signUpNewUser = () => {
    const userObj = {}

    this.allInputs.forEach(item => {
      userObj[item.dataset.property] = item.value
    })

    new HttpRequests().post(`${_API_URL}/signin`, userObj, true)
      .then(res => {
        localStorage.setItem('currentUserToken', res.token)
        localStorage.setItem('currentUser', this.username.value)
      }).then(() => window.location.assign('./bookList.html'))
  }

  validatePassword = () => {
    const firstPasswordField = document.querySelector('.register__password-field input')

    if (this.repeatPasswordField.value.length === 0) {
      this.repeatPassword.classList.remove('.wrong-field')
      this.password.classList.remove('.wrong-field')

      this.repeatPasswordField.previousElementSibling.textContent = 'это поле не должно быть пустым*'
      this.password.firstElementChild.textContent = 'это поле не должно быть пустым*'

      this.isAllFieldsValid = false
    } else if (firstPasswordField.value !== this.repeatPasswordField.value) {
      this.repeatPasswordField.previousElementSibling.textContent = 'пароли не совпадают*'
      this.repeatPassword.classList.add('wrong-field')

      this.password.firstElementChild.textContent = 'пароли не совпадают*'
      this.password.classList.add('wrong-field')

      this.isAllFieldsValid = false
    }
  }
}

export default SignUp