import blogsService from '../../services/blogs'
import { DELETE_BLOG, INIT_BLOGS, LIKE_BLOG } from '../types/types'

export const setBlogs = () => {
  return async (dispatch) => {
    const data = await blogsService.getAll()
    dispatch({ type: INIT_BLOGS, payload: data })
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    dispatch({ type: LIKE_BLOG, payload: { id } })
    await blogsService.like(id, likedBlog)
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_BLOG, payload: { id } })
    await blogsService.remove(id)
  }
}
