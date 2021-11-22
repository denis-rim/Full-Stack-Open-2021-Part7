import React, { useEffect } from 'react'
import userServices from '../services/users'
import Layout from '../components/shared/Layout'

const UsersPage = () => {
  const [users, setUsers] = React.useState([])

  useEffect(async () => {
    const data = await userServices.getAllUsers()
    setUsers(data)
  }, [])

  if (!users) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <div>
        <h1 className="text-center font-bold text-2xl">Users</h1>
        <ul role="list" className="divide-y divide-gray-200 mt-4">
          {users.map((user) => (
            <UserListComponents key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}
export default UsersPage

const UserListComponents = ({ user }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <li>
        <div className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600">
                {user.username}
              </p>
              <div className="ml-2 flex-shrink-0 flex text-sm font-medium ">
                Blogs created: {user.blogs.length}
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}
