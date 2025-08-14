const blog = require("../models/blog")

const dummy = (blogs) => {
  // just return 1
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
        favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = {}
  blogs.forEach(blog => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
  })

  let maxAuthor = ''
  let maxCount = 0
  for (const author in authorCounts) {
    if (authorCounts[author] > maxCount) {
        maxCount = authorCounts[author]
        maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = {}
  blogs.forEach(blog => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
  })

  let maxAuthor = ''
  let maxLikes = 0
  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
        maxLikes = authorLikes[author]
        maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}