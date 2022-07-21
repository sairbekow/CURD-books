export const spinner = (bool) => {
  const spinnerEl = document.querySelector('.spinner')
  if(bool) {
    spinnerEl.style.display = 'block'
  } else {
    spinnerEl.style.display = 'none'
  }
}