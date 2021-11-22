import { LOGIN_USER, LOGOUT_USER } from '../types/types'

const initialState = {
  user: JSON.parse(localStorage.getItem('blogAppUser')) || {},
  isLoggedIn: !!JSON.parse(localStorage.getItem('blogAppUser')),
}

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      }
    }

    default: {
      return state
    }
  }
}
