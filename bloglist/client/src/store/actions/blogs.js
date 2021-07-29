import blogsService from '../../services/blogs'
import { INIT_BLOGS } from '../types/types'

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({ type: INIT_BLOGS, payload: blogs })
  }
}
