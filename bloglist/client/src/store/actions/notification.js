import { SHOW_NOTIFICATION } from '../types/types'

export const showNotification = (notification) => {
  if (window.notificationTimeout) {
    window.clearTimeout(window.notificationTimeout)
  }
  return async (dispatch) => {
    dispatch({ type: SHOW_NOTIFICATION, payload: notification })

    window.notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, 5000)
  }
}
