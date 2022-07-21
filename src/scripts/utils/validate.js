export const validate = (field) => {
  if (field.value.trim().length === 0) {
    field.parentElement.classList.add('wrong-field')
    return false

  } else {
    field.parentElement.classList.remove('wrong-field')

    return true
  }
}