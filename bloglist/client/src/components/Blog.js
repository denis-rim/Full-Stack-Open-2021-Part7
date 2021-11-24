import React from 'react'
import { useHistory } from 'react-router-dom'
import { deleteBlog } from '../store/actions/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../store/actions/notification'
import { likeBlog } from '../store/actions/blogs'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLikeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(blog.id, likedBlog))
    dispatch(showNotification({ text: `You liked ${blog.title}` }))
  }

  const handleDeleteBlog = (blog) => {
    const confirm = window.confirm('Delete blog?')
    const { token } = user.user
    if (confirm) {
      dispatch(deleteBlog(blog.id, token))
      dispatch(showNotification({ text: `You deleted ${blog.title}` }))
      history.replace(`/users/${user.user.id}`)
    }
  }

  return (
    <div key={blog.id} className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl  font-medium text-gray-900">{blog.title}</h1>
          <p className="text-md text-gray-500 truncate">
            Added by: {blog.author}
          </p>
        </div>
        <div className="flex align-center">
          {blog.user[0].id === user.user.id ? (
            <button
              className="mr-2 bg-red-500 rounded px-2 py-1 text-gray-100"
              onClick={() => handleDeleteBlog(blog)}
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <span>
        Likes: {blog.likes}{' '}
        <button
          className="inline-block bg-indigo-500 py-0.5 px-1 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
          onClick={() => handleLikeBlog(blog)}
        >
          Like
        </button>
      </span>
    </div>
  )
}
export default Blog
