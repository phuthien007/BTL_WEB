import apiClient from 'services/axios'
import store from 'store'

export async function login(username, password) {
  return apiClient
    .post('/user/login', {
      username,
      password,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(username, email, password, name) {
  return apiClient
    .post('/user/signup', {
      email,
      username,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { status } = response.data
        if (status === 'success') {
          // notification.success({
          //   message: 'Register success',
          //   description: 'Please check your email to verify your account',
          // })
          return true
        }
        return false
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  return apiClient
    .get('/user/me')
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data.data.user
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  store.remove('accessToken')
  return true
}
