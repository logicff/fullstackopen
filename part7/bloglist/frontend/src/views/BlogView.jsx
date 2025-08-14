import { Blog } from "../components/BlogList"
import Comments from "../components/Comments"
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useParams } from "react-router-dom"

const BlogView = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blog = blogs.find(b => b.id === id)

  const [commentField, resetComment] = useField('text')

  const dispatch = useDispatch()
  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }
  const handleComment = async () => {
    dispatch(commentBlog(blog, { content: commentField.value }))
    resetComment()
  }

  if (!blog) {
    return <div>Loading blog...</div>
  }

  return (
    <div>
      <Blog
        blog={blog}
        handleLike={() => handleLike(blog)}
        handleRemove={() => handleRemove(blog)}
        user={user}
      />
      <h3>comments</h3>
      <div>
        <input {...commentField} />
        <button onClick={handleComment}>add comment</button>
      </div>
      <Comments comments={blog.comments} />
    </div>
  )
}

export default BlogView