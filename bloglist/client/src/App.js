import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AddBlogPage from './pages/AddBlogPage'
import BlogPage from './pages/BlogPage'
import BlogsPage from './pages/BlogsPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import UserPage from './pages/UserPage'
import UsersPage from './pages/UsersPage'
import { setBlogs } from './store/actions/blogs'

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setBlogs())
    }
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    )
  }

  return (
    <Layout>
      <AuthRoutes />
    </Layout>
  )
}

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={UsersPage} />
      <Route path="/add-blog" component={AddBlogPage} />
      <Route path="/users/:userId" component={UserPage} />
      <Route exact path="/blogs" component={BlogsPage} />
      <Route path="/blogs/:blogId" component={BlogPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default App
