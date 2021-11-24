const postRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

postRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate([
    { path: 'user', select: { username: 1, name: 1, id: 1 } },
    { path: 'comments' },
  ])

  response.json(blogs)
})

postRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id

  const blog = await Blog.findById(blogId).populate([
    { path: 'user', select: { username: 1, name: 1, id: 1 } },
    { path: 'comments' },
  ])

  if (!blog) {
    return response.status(404).json({ errorMessage: 'Blog not found' })
  }

  response.json(blog)
})

postRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const content = request.body.content

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).json({ errorMessage: 'Blog not found' })
  }

  const comment = new Comment({
    content,
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)

  await blog.save()

  response.json(savedComment)
})

postRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body
  const userId = request.user

  if (!userId) {
    return response
      .status(401)
      .json({ errorMessage: 'token missing or invalid' })
  }

  if (!title && !url) {
    return response.status(400).json({})
  }

  const user = await User.findById(userId)

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user,
  })

  const savedBlog = await blog.save()

  const populatedBlog = await Blog.populate(savedBlog, {
    path: 'user',
    select: {
      username: 1,
      name: 1,
      id: 1,
    },
  })

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  response.json(populatedBlog)
})

postRouter.delete('/:id', userExtractor, async (request, response) => {
  const userId = request.user

  if (!userId) {
    return response
      .status(401)
      .json({ errorMessage: 'token missing or invalid' })
  }

  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog.user.toString() !== userId.toString()) {
    response.status(403).json({ errorMessage: 'invalid user' })
  }

  await Blog.deleteOne({ _id: blogId })

  response.sendStatus(204)
})

postRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = postRouter
