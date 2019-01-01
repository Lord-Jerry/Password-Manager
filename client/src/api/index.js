class api {

    static checkUsernameExists(user) {
      const data = {username: user}
      return fetch('api/v1/checkUsernameExists',{
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: user})
  
      })
    }

    static signupForm(user,pass) {
      return fetch('api/v1/signup',{
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: String(user),
          password: String(pass)
        })
      })
    }

    //
    static loginForm(user,pass) {
      return fetch('api/v1/login',{
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: String(user),
          password: String(pass)
        })
      })
    }

    static getDetails() {

      return fetch('api/v1/details',{
        method: 'GET',
        mode: 'cors',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Token: localStorage.getItem('token')
        },
      })

    }

}
export default api