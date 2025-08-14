import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [titleField, resetTitle] = useField('text')
  const [authorField, resetAuthor] = useField('text')
  const [urlField, resetUrl] = useField('text')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value
    }
    dispatch(createBlog(newBlog))
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            data-testid='input-title'
            {...titleField}
            placeholder='write blog title here'
            required
          />
        </div>
        <div>
          author: <input
            data-testid='input-author'
            {...authorField}
            placeholder='write blog author here'
            required
          />
        </div>
        <div>
          url: <input
            data-testid='input-url'
            {...urlField}
            placeholder='write blog url here'
            required
          />
        </div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )
}

export default BlogForm
