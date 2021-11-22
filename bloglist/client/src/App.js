import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { useSelector } from 'react-redux'
import UserPage from './pages/UserPage'
import UsersPage from './pages/UsersPage'

const App = () => {
  // const dispatch = useDispatch()
  // const blogs = useSelector((state) => state.blogs)
  // const user = useSelector((state) => state.user)
  //
  // const blogFormRef = useRef()
  //
  // useEffect(() => {
  //   dispatch(setBlogs())
  // }, [])
  //
  // const showMessage = (text, type) => {
  //   dispatch(showNotification({ text, type }))
  // }
  //
  // const handleLogout = () => {
  //   window.localStorage.removeItem('blogAppUser')
  // }
  //
  // const addBlog = (blogObject) => {
  //   blogFormRef.current.toggleVisibility()
  //   blogService
  //     .create(blogObject)
  //     .then((returnedBlog) => {
  //       console.log(returnedBlog)
  //       showMessage(
  //         `a new blog ${blogObject.title} by ${blogObject.author} added`
  //       )
  //     })
  //     .catch((error) => {
  //       if (!error.response.data.errorMessage) {
  //         return showMessage(
  //           'Something went wrong. Please try again later.',
  //           'error'
  //         )
  //       }
  //       showMessage(error.response.data.errorMessage, 'error')
  //     })
  // }
  //
  // const deleteBlog = (id, blogObject) => {
  //   const result = window.confirm(`Delete ${blogObject.title}?`)
  //
  //   if (!result) {
  //     return
  //   }
  //
  //   blogService
  //     .remove(id)
  //     .then(() => {
  //       setBlogs(
  //         blogs
  //           .filter((blog) => blog.id !== id)
  //           .sort((a, b) => b.likes - a.likes)
  //       )
  //       showMessage('blog was removed')
  //     })
  //     .catch((error) => {
  //       if (!error.response.data.errorMessage) {
  //         return showMessage(
  //           'Something went wrong. Please try again later.',
  //           'error'
  //         )
  //       }
  //       showMessage(error.response.data.errorMessage, 'error')
  //     })
  // }
  //
  // if (!user.isLoggedIn) return <Login />
  //
  // const addBlogForm = () => (
  //   <Toggleable buttonLabel="Add blog" ref={blogFormRef}>
  //     <AddBlogForm createBlog={addBlog} />
  //   </Toggleable>
  // )
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={UsersPage} />
      <Route path="/users/:userId" component={UserPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default App

// <div className="app">
//   <h2>blogs</h2>
//   {user && (
//     <div>
//       <h3>
//         {user.name} logged in{' '}
//         <button id="logout-button" onClick={handleLogout}>
//           logout
//         </button>
//       </h3>
//       {addBlogForm()}
//     </div>
//   )}
//
//   <Notification />
//   <div id="blogs-list">
//     {blogs
//       .sort((a, b) => b.likes - a.likes)
//       .map((blog) => (
//         <Blog
//           key={blog.id}
//           blog={blog}
//           removeBlog={deleteBlog}
//           user={user}
//         />
//       ))}
//   </div>
// </div>
