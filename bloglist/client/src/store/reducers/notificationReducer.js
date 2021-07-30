import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../types/types'

const initialState = { message: null }

export const notificationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        message: payload,
      }
    }

    case HIDE_NOTIFICATION: {
      return {
        ...state,
        message: null,
      }
    }

    default:
      return state
  }
}
