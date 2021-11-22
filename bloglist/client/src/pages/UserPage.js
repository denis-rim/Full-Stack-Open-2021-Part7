import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userServices from '../services/users'
import Layout from '../components/shared/Layout'

const UserPage = () => {
  const [user, setUser] = React.useState(null)
  const { userId } = useParams()

  useEffect(async () => {
    const user = await userServices.getUserById(userId)
    setUser(user)
  }, [userId])

  if (!user) return null

  if (user && user.blogs.length === 0) {
    return (
      <Layout>
        <h2 className="text-center text-xl">User has no added blogs</h2>
      </Layout>
    )
  }

  return (
    <Layout>
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
              <div className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600">
                      {blog.title}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </Layout>
  )
}

export default UserPage
