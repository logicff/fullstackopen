// mergeParams 允许访问父路由的 params（如 :id）
const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

commentsRouter.post('/', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    const comment = new Comment({
      content: body.content,
      blog: blog._id,
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    const commentJson = savedComment.toJSON()
    commentJson.blog = {
      id: blog._id.toString(),
    }
    response.status(201).json(commentJson)
  } catch (error) {
    next(error)
  }
})

module.exports = commentsRouter