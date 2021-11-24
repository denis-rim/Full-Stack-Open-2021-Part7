import { SET_USERS } from '../types/types'

const initialState = []

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USERS: {
      return [...payload]
    }
    default: {
      return state
    }
  }
}
