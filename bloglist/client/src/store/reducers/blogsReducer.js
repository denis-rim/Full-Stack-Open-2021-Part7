import { DELETE_BLOG, INIT_BLOGS, LIKE_BLOG } from '../types/types'

const initialState = { blogs: [] }

export const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action

  console.log('payload:  ', payload)
  console.log('state:  ', state)

  switch (type) {
    case INIT_BLOGS: {
      return { ...state, blogs: payload }
    }

    case LIKE_BLOG: {
      const blogToVote = state.blogs.find((blog) => blog.id === payload.id)
      const updatedBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1,
      }
      const newBlogs = state.blogs.map((blog) =>
        blog.id !== payload.id ? blog : updatedBlog
      )

      return {
        ...state,
        blogs: newBlogs,
      }
    }

    case DELETE_BLOG: {
      const blogs = state.blogs.filter((blog) => blog.id !== payload.id)
      return {
        ...state,
        blogs,
      }
    }

    default:
      return state
  }
}
