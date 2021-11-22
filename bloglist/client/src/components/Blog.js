import React, { useState } from 'react'
import { deleteBlog } from '../store/actions/blogs'
import { useDispatch, useSelector } from 'react-redux'
// import { deleteBlog, likeBlog } from '../store/actions/blogs'
// import { showNotification } from '../store/actions/notification'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [visible, setVisible] = useState(false)

  // const handleLikeBlog = (blog) => {
  //   const likedBlog = { ...blog, likes: blog.likes + 1 }
  //   dispatch(likeBlog(blog.id, likedBlog))
  //   dispatch(showNotification({ text: `You liked ${blog.title}` }))
  // }
  //
  const handleDeleteBlog = (blog) => {
    const confirm = window.confirm('Delete blog?')
    if (confirm) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const toggleVisible = () => {
    setVisible((prev) => !prev)
  }

  return (
    // <div className="blog" style={blogStyle}>
    //   <div>
    //     <span>{blog.title}</span>
    //     <span>{blog.author}</span>
    //     <button onClick={toggleVisibility}>{!visible ? 'View' : 'Hide'}</button>
    //   </div>
    //   {visible && (
    //     <div>
    //       <p>Title: {blog.title}</p>
    //       <p>{blog.url}</p>
    //       <span id="like-count">
    //         Likes: {blog.likes}{' '}
    //         <button id="like-button" onClick={() => handleLikeBlog(blog)}>
    //           like
    //         </button>
    //       </span>
    //       <p>{blog.author}</p>
    //
    //       {user.username === blog.user[0].username ? (
    //         <button id="delete-button" onClick={() => handleDeleteBlog(blog)}>
    //           Remove
    //         </button>
    //       ) : null}
    //     </div>
    //   )}
    // </div>
    <li key={blog.id} className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate">
            Title: {blog.title}
          </p>
          <p className="text-md text-gray-500 truncate">
            Author: {blog.author}
          </p>
        </div>
        <div className="flex align-center">
          {user?.user?.username === blog?.user[0]?.username ? (
            <button
              className="mr-2 bg-red-500 rounded px-2 py-1 text-gray-100"
              onClick={() => handleDeleteBlog(blog)}
            >
              Remove
            </button>
          ) : null}
          <button
            onClick={toggleVisible}
            className="inline-flex items-center shadow-sm px-3.5 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
          >
            {visible ? 'Close' : 'Open'}
          </button>
        </div>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
        </div>
      )}
    </li>
  )
}
export default Blog
