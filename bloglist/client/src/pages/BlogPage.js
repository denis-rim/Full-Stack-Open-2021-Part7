import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import { addCommentToBlog } from '../store/actions/blogs'

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
      <AddCommentForm blogId={blogId} />
      <CommentsList comments={blog.comments} />
    </>
  )
}

const AddCommentForm = ({ blogId }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleAddComment = async (event) => {
    event.preventDefault()
    const newComment = { content }
    dispatch(addCommentToBlog(blogId, newComment))
    setContent('')
  }
  return (
    <div className="mt-4">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="shadow-sm p-1 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-80 sm:text-sm border-gray-300 rounded-md"
      />
      <button
        className="inline-block bg-indigo-500 py-1 px-2 mt-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
        onClick={handleAddComment}
      >
        Add comment
      </button>
    </div>
  )
}

const CommentsList = ({ comments }) => {
  return (
    <>
      <h1 className="text-2xl text-center">Comments</h1>
      <ul className="mt-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="w-full mt-1 text-xl py-1 px-2 border border-gray-200"
          >
            {comment.content}
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogPage
