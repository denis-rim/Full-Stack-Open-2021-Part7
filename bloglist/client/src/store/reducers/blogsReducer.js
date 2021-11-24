import {
  ADD_COMMENT_TO_BLOG,
  CREATE_BLOG,
  DELETE_BLOG,
  INIT_BLOGS,
  LIKE_BLOG,
} from '../types/types'

const initialState = []

export const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case INIT_BLOGS: {
      return [...payload]
    }

    case LIKE_BLOG: {
      const blogToVote = state.find((blog) => blog.id === payload.id)
      const updatedBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1,
      }

      return state.map((blog) => (blog.id !== payload.id ? blog : updatedBlog))
    }

    case CREATE_BLOG: {
      return [...state, payload]
    }

    case ADD_COMMENT_TO_BLOG: {
      const { blogId, data: comment } = payload

      const blogToAddComment = state.find((blog) => blog.id === blogId)

      if (!blogToAddComment) {
        break
      }

      const updatedBlog = {
        ...blogToAddComment,
        comments: [...blogToAddComment.comments, comment],
      }

      return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog))
    }

    case DELETE_BLOG: {
      return state.filter((blog) => blog.id !== payload.id)
    }

    default:
      return state
  }
}
