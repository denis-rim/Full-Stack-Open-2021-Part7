import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../store/actions/login'

const navigation = [
  { name: 'Blogs', href: '/blogs' },
  { name: 'Users', href: '/users' },
]

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="bg-indigo-600 px-0 xl:px-40">
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {user.isLoggedIn ? (
            <div className="flex">
              <span className="inline-block bg-gray-100 py-2 px-4 mr-8 border border-transparent rounded-md text-base font-medium">
                {user.user.username} is Logged in
              </span>
              <div className="space-x-4">
                <Link
                  to="/add-blog"
                  className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Add Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="ml-10 space-x-4">
              <a
                href="#"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Log in
              </a>
            </div>
          )}
        </div>

        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
