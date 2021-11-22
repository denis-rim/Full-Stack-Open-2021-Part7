import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../store/actions/blogs'
import Layout from '../components/shared/Layout'
import Blog from '../components/Blog'

const HomePage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(setBlogs())
  }, [])

  return (
    <Layout>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default HomePage
