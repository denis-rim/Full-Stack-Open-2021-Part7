import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../store/actions/blogs'

const AddBlogForm = () => {
  const userToken = useSelector((state) => state.user.user.token)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }

    dispatch(createBlog(newBlog, userToken))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h1 className="text-center font-bold text-2xl">Add Blog</h1>

          <div style={{ margin: '2rem 0' }}>
            <form onSubmit={addBlog}>
              <div>
                <label
                  htmlFor="title"
                  className="block mt-2 text-sm font-medium text-gray-700"
                >
                  TITLE
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    className="shadow-sm p-1 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block mt-2 text-sm font-medium text-gray-700"
                >
                  AUTHOR
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    className="shadow-sm p-1 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Author"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="url"
                  className="block mt-2 text-sm font-medium text-gray-700"
                >
                  URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    className="shadow-sm p-1 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="www.link.com"
                  />
                </div>
              </div>
              <button
                className="inline-block bg-indigo-500 py-1 px-2 w-full mt-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                type="submit"
              >
                Add blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBlogForm
