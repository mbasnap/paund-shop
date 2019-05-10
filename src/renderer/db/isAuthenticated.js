export default (to, from, next) => {
    if (localStorage.getItem('jwtToken')) {
      next()
      return
    }
    next('/login')
  }