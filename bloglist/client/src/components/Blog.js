import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../store/actions/blogs'
import { showNotification } from '../store/actions/notification'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(blog.id, likedBlog))
    dispatch(showNotification({ text: `You liked ${blog.title}` }))
  }

  const handleDeleteBlog = (blog) => {
    // await removeBlog(blog.id, blog)
    dispatch(deleteBlog(blog.id))
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button onClick={toggleVisibility}>{!visible ? 'View' : 'Hide'}</button>
      </div>
      {visible && (
        <div>
          <p>Title: {blog.title}</p>
          <p>{blog.url}</p>
          <span id="like-count">
            Likes: {blog.likes}{' '}
            <button id="like-button" onClick={() => handleLikeBlog(blog)}>
              like
            </button>
          </span>
          <p>{blog.author}</p>

          {user.username === blog.user[0].username ? (
            <button id="delete-button" onClick={() => handleDeleteBlog(blog)}>
              Remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
export default Blog
