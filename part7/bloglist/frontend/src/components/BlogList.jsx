import { useSelector } from 'react-redux'
import NavigationLink from './NavigationLink'
import '../style/Blog.css'

export const Blog = ({ blog, handleLike, handleRemove, user }) => {
  if (!blog) return null

  return (
    <div>
      <h2>{blog.title} || author@{blog.author}</h2>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          <span data-testid="likes-count">likes: {blog.likes}</span>
          <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {user.id === blog.user.id && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <div key={blog.id} className='blog-card'>
          <NavigationLink to={`/blogs/${blog.id}`}>{blog.title} || author@{blog.author}</NavigationLink>
        </div>
      )}
    </div>
  )
}

export default BlogList