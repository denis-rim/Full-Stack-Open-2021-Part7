import blogsService from '../../services/blogs'
import {
  ADD_COMMENT_TO_BLOG,
  CREATE_BLOG,
  DELETE_BLOG,
  INIT_BLOGS,
  LIKE_BLOG,
  SHOW_NOTIFICATION,
} from '../types/types'
import { showNotification } from './notification'

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

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    await blogsService
      .create(blog, token)
      .then((data) => {
        dispatch({ type: CREATE_BLOG, payload: data })
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { text: 'New blog added' },
        })
      })
      .catch((error) => {
        dispatch(
          showNotification({
            text: 'Failed to add blog',
            type: 'error',
          })
        )
        console.log(error.response)
      })
  }
}

export const addCommentToBlog = (blogId, comment) => {
  return async (dispatch) => {
    await blogsService
      .addComment(blogId, comment)
      .then((data) => {
        dispatch({ type: ADD_COMMENT_TO_BLOG, payload: { blogId, data } })
        dispatch(
          showNotification({
            text: 'Comment added',
          })
        )
      })
      .catch((error) => {
        dispatch(
          showNotification({
            text: 'Failed to add comment',
            type: 'error',
          })
        )
        console.log(error)
      })
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_BLOG, payload: { id } })
    await blogsService.remove(id, token)
  }
}
