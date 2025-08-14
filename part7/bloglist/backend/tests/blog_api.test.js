const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = ''

describe('Blog List API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const { username, password, userId } = await helper.initializeUser()
    const loginInfo = await api.post('/api/login').send({ username, password })
    token = loginInfo.body.token

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog({ ...blog, user: userId }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog\'s unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert('id' in blog)
    })
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const result = resultBlog.body
      assert(result.id === blogToView.id && result.title === blogToView.title
        && result.author === blogToView.author && result.url === blogToView.url
        && result.likes === blogToView.likes
      )
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invaild', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Logicff Blog',
        author: 'logicff',
        url: 'https://logicff.github.io',
        likes: 1000000,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      assert(blogsAtEnd.some(blog => (
        newBlog.title === blog.title && newBlog.author === blog.author
        && newBlog.url === blog.url && newBlog.likes === blog.likes
      )))
    })

    test('missing likes property from request will default to the value 0', async () => {
      const newBlog = {
        title: 'the likes property is missing from the request',
        author: 'test',
        url: 'https://localhost/test',
      }

      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
      assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title or url is not added', async () => {
      const newBlog = {
        author: 'test',
        likes: 100,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with statuscode 401 if a token is not provided', async () => {
      const newBlog = {
        title: 'Logicff Blog',
        author: 'logicff',
        url: 'https://logicff.github.io',
        likes: 1000000,
      }

      await api.post('/api/blogs').send(newBlog).expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert(!blogsAtEnd.some(blog => blog.id === blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updation of a blog', () => {
    test('a valid blog and a valid id can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newBlog = {
        title: 'Logicff Blog',
        author: 'logicff',
        url: 'https://logicff.github.io',
        likes: 1000000,
      }

      await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      assert(blogsAtEnd.some(blog => (blog.id === blogToUpdate.id
        && newBlog.title === blog.title && newBlog.author === blog.author
        && newBlog.url === blog.url && newBlog.likes === blog.likes
      )))
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      const newBlog = {
        title: 'Logicff Blog',
        author: 'logicff',
        url: 'https://logicff.github.io',
        likes: 1000000,
      }
      await api.put(`/api/blogs/${validNonexistingId}`).send(newBlog).expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
