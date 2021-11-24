import usersService from '../../services/users'
import { SET_USERS } from '../types/types'

export const setUsers = () => {
  return async (dispatch) => {
    const data = await usersService.getAllUsers()
    dispatch({ type: SET_USERS, payload: data })
  }
}
