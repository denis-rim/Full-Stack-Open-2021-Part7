import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import userServices from '../services/users'

const UserPage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(async () => {
    const data = await userServices.getUserById(userId)
    setUser(data)
  }, [userId])

  if (!user) return null

  if (user && user.blogs.length === 0) {
    return (
      <h2 className="text-center text-xl">
        {user.username} has no added blogs
      </h2>
    )
  }

  return (
    <>
      <div>
        <h1 className="text-center font-bold text-2xl">{user.username}</h1>
      </div>

      <h2 className="font-bold text-xl">Added blogs:</h2>
      <ul role="list" className="divide-y divide-gray-200 mt-4">
        {user.blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow overflow-hidden sm:rounded-md"
          >
            <li>
              <Link to={`/blogs/${blog.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 border border-gray-100 sm:px-6">
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
    </>
  )
}

export default UserPage
