import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogsPage = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Blogs</h1>
      <ul role="list" className="divide-y divide-gray-200 mt-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-gray-100 shadow overflow-hidden sm:rounded-md"
          >
            <li>
              <Link to={`/blogs/${blog.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600">
                      {blog.title}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BlogsPage
