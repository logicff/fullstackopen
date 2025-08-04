import { useState } from 'react'
import '../style/Blog.css'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  const handleLike = () => {
    updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }
  const handleRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog-card'>
      <div>
        {blog.title} || author@{blog.author}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'hide' : 'view'}
        </button>
      </div>
      {showDetail ?
        <div>
          <div>{blog.url}</div>
          <div>
            <span data-testid="likes-count">likes: {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.id === blog.user.id && <button onClick={handleRemove}>remove</button>}
        </div> : null
      }
    </div>
  )
}

export default Blog