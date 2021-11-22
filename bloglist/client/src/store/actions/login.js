import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { showNotification } from './notification'
import { LOGIN_USER, LOGOUT_USER } from '../types/types'

export const setLoginUser = (username, password) => {
  return async (dispatch) => {
    await loginService
      .login({ username, password })
      .then((data) => {
        window.localStorage.setItem('blogAppUser', JSON.stringify(data))
        blogService.setToken(data.token)
        dispatch({ type: LOGIN_USER, payload: data })
      })
      .catch((error) => {
        dispatch(showNotification({ text: 'Login failed', type: 'error' }))
        console.error(error)
      })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogAppUser')
    dispatch({ type: LOGOUT_USER })
  }
}
