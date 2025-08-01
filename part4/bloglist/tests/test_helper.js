const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const listWithZeroBlog = []
const indicatorOfZeroBlog = {
  totalLikes: 0,
  favoriteBlog: null,
  mostBlogs: null,
  mostLikes: null,
}

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }
]
const indicatorOfOneBlog = {
  totalLikes: 5,
  favoriteBlog: {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
  mostBlogs: {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  },
  mostLikes: {
    author: 'Edsger W. Dijkstra',
    likes: 5
  },
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]
const indicatorOfBlogs = {
  totalLikes: 36,
  favoriteBlog: {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  mostBlogs: {
    author: "Robert C. Martin",
    blogs: 3
  },
  mostLikes: {
    author: "Edsger W. Dijkstra",
    likes: 17
  },
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'test', url: 'https://localhost' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initializeUser = async () => {
  const username = 'testuser'
  const name = 'test'
  const password = 'password'

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  
  return { username, password, userId: savedUser._id }
}

module.exports = {
  listWithZeroBlog, indicatorOfZeroBlog,
  listWithOneBlog, indicatorOfOneBlog,
  initialBlogs, indicatorOfBlogs,
  nonExistingId,
  blogsInDb,
  initializeUser
}