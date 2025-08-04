const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }

  if (!(body.title && body.url)) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'unknown',
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const blogJson = savedBlog.toJSON()
    blogJson.user = {
      id: user._id.toString(),
      username: user.username,
      name: user.name
    }
    response.status(201).json(blogJson)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }

  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'not authorized to delete this blog' })
    }
    
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (!(body.title && body.url)) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = {
    title: body.title,
    author: body.author || 'unknown',
    url: body.url,
    likes: body.likes || 0,
    user: body.user
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1 })
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter