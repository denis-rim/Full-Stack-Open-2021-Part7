import { INIT_BLOGS } from '../types/types'

const initialState = {
  blogs: [],
}

export const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case INIT_BLOGS: {
      return {
        ...state,
        blogs: payload,
      }
    }

    default:
      return state
  }
}
