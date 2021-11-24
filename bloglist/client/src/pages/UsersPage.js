import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/users'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const data = await userServices.getAllUsers()
    setUsers(data)
  }, [])

  if (!users) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Users</h1>
      <ul role="list" className="divide-y divide-gray-200 mt-4">
        {users.map((user) => (
          <UserListComponents key={user.id} user={user} />
        ))}
      </ul>
    </div>
  )
}
export default UsersPage

const UserListComponents = ({ user }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <li>
        <Link to={`/users/${user.id}`} className="block hover:bg-gray-50">
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
        </Link>
      </li>
    </div>
  )
}
