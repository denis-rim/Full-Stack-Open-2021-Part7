import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'

const BlogPage = () => {
  const { blogId } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  )

  if (!blog)
    return (
      <div className="text-center text-3xl">
        <h2>No such blog</h2>
      </div>
    )

  return (
    <>
      <div>
        <h1 className="text-3xl">Blog Page</h1>
      </div>
      <Blog blog={blog} />
    </>
  )
}

export default BlogPage
