import Togglable from "../components/Togglable"
import BlogForm from "../components/BlogForm"
import BlogList from "../components/BlogList"
import { useRef } from 'react'

const BlogsView = () => {
  const toggleBlogForm = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={toggleBlogForm}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default BlogsView