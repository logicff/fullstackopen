import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogInfo from './components/LogInfo'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const toggleBlogForm = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      loginService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({
        type: 'error',
        message: 'Wrong username or password',
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    loginService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    toggleBlogForm.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({
        type: 'success',
        message: `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
      })
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setNotification({
        type: 'error',
        message: `${error.response.data.error}` || error.message || 'add failed',
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
    } catch (error) {
      setNotification({
        type: 'error',
        message: `${error.response.data.error}` || error.message || 'failed',
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({
        type: 'success',
        message: `succeed to delete the blog "${id}"`,
      })
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setNotification({
        type: 'error',
        message: `${error.response.data.error}` || error.message || 'delete failed',
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notifications notification={notification} />
        <LoginForm login={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notifications notification={notification} />
      <LogInfo name={user.name} handleLogout={handleLogout} />
      <Togglable buttonLabel="new blog" ref={toggleBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App