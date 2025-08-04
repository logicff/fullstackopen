import { useState } from 'react'

const BlogForm = (props) => {
  const createBlog = props.createBlog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            data-testid='input-title'
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='write blog title here'
            required
          />
        </div>
        <div>
          author: <input
            data-testid='input-author'
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='write blog author here'
            required
          />
        </div>
        <div>
          url: <input
            data-testid='input-url'
            value={newUrl}
            onChange={handleUrlChange}
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
