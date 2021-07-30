import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './store/actions/notification'
import { setBlogs } from './store/actions/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.blogs)

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (text, type) => {
    dispatch(showNotification({ text, type }))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        console.log(returnedBlog)
        showMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      })
      .catch((error) => {
        if (!error.response.data.errorMessage) {
          return showMessage(
            'Something went wrong. Please try again later.',
            'error'
          )
        }
        showMessage(error.response.data.errorMessage, 'error')
      })
  }

  const deleteBlog = (id, blogObject) => {
    const result = window.confirm(`Delete ${blogObject.title}?`)

    if (!result) {
      return
    }

    blogService
      .remove(id)
      .then(() => {
        setBlogs(
          blogs
            .filter((blog) => blog.id !== id)
            .sort((a, b) => b.likes - a.likes)
        )
        showMessage('blog was removed')
      })
      .catch((error) => {
        if (!error.response.data.errorMessage) {
          return showMessage(
            'Something went wrong. Please try again later.',
            'error'
          )
        }
        showMessage(error.response.data.errorMessage, 'error')
      })
  }

  if (!user) return <Login setUser={setUser} />

  const addBlogForm = () => (
    <Toggleable buttonLabel="Add blog" ref={blogFormRef}>
      <AddBlogForm createBlog={addBlog} />
    </Toggleable>
  )

  return (
    <div className="app">
      <h2>blogs</h2>
      {user && (
        <div>
          <h3>
            {user.name} logged in{' '}
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </h3>
          {addBlogForm()}
        </div>
      )}

      <Notification />
      <div id="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              removeBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  )
}

export default App
