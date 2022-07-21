export const redirect = () => {
  const isUserLogged = !!localStorage.getItem('currentUser')

  if (isUserLogged
    && (window.location.pathname === '/index.html'
      || window.location.pathname === '/')) {
    location.assign('./bookList.html')
  }

  if (!isUserLogged
    && window.location.pathname !== '/'
    && window.location.pathname !== '/index.html'
    && window.location.pathname !== '/register.html') {
    location.assign('/')
  }
}