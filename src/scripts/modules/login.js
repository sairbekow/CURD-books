import {_API_URL} from "../data/consts";
import HttpRequests from "../utils/httpRequests";
import {redirect} from "../utils/redirect";
import {validate} from "../utils/validate";
import {spinner} from "../utils/spinner";
import {disableButton} from "../utils/disableButton";


class Login {
  usernameField = document.querySelector('.login__input--username input')
  passwordField = document.querySelector('.login__input--password input')
  submitForm = document.querySelector('.login__form')
  submitBtn = document.querySelector('.login__btn')
  wrongField = document.querySelector('.login__wrong-field')

  isAllFieldsValid = true

  initialize = () => {
    this.usernameField && this.usernameField.addEventListener('input',
      () => {
        this.isAllFieldsValid = validate(this.usernameField)
      })
    this.passwordField && this.passwordField.addEventListener('input',
      () => {
        this.isAllFieldsValid = validate(this.passwordField)
      })
    this.submitForm && this.submitForm.addEventListener('submit', this.submit)
  }

  submit = (e) => {
    e.preventDefault()


    this.isAllFieldsValid = validate(this.usernameField)
    this.isAllFieldsValid = validate(this.passwordField)

    if (this.isAllFieldsValid) {
      spinner(true)
      disableButton(this.submitBtn)

      new HttpRequests().post(`${_API_URL}/login`, {
        username: this.usernameField.value,
        password: this.passwordField.value
      }).then((res) => {
        if(res === 'incorrect login data') {
          this.wrongField.style.display = 'block'
        } else {
          localStorage.setItem('currentUserToken', res.token)
          localStorage.setItem('currentUser', this.usernameField.value)
          redirect()
        }
      })
    }
  }
}

export default Login