import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    commentBlogWith(state, action) {
      const { id, comment } = action.payload
      const commentedBlog = state.find(b => b.id === id)
      commentedBlog.comments = commentedBlog.comments.concat(comment)
    },
    removeBlogOf(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    likeBlogOf(state, action) {
      const id = action.payload
      const blogToLike = state.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
      return state.map(blog => blog.id !== id ? blog : likedBlog)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { commentBlogWith, removeBlogOf, likeBlogOf, updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(blog)
      dispatch(appendBlog(savedBlog))
      dispatch(setNotification({
        type: 'success',
        message: `a new blog "${savedBlog.title}" by ${savedBlog.author} added`,
      }, 5))
    } catch (error) {
      dispatch(setNotification({
        type: 'error',
        message: `${error.response?.data?.error}` || error.message || 'add failed',
      }, 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      const savedBlog = await blogService.update(updatedBlog.id, updatedBlog)
      dispatch(likeBlogOf(savedBlog.id))
    } catch (error) {
      dispatch(setNotification({
        type: 'error',
        message: `${error.response?.data?.error}` || 'like failed',
      }, 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlogOf(blog.id))
      dispatch(setNotification({
        type: 'success',
        message: `succeed to delete the blog "${blog.title}" by ${blog.author}`,
      }, 5))
    } catch (error) {
      dispatch(setNotification({
        type: 'error',
        message: `${error.response?.data?.error}` || error.message || 'delete failed',
      }, 5))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const savedComment = await commentService.create(blog.id, comment)
      dispatch(commentBlogWith({ id: blog.id, comment: savedComment }))
    } catch (error) {
      dispatch(setNotification({
        type: 'error',
        message: `${error.response?.data?.error}` || 'comment failed',
      }, 5))
    }
  }
}

export default blogSlice.reducer
