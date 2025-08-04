import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '688ef2d5fe5e9bff745cbcbe',
    title: 'Component testing with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user:{
      username: 'test',
      name: 'tester',
      id: '688c62c69dc85f7b1ea61c4e'
    }
  }
  
  test('renders title and author, but not url or likes', () => {
    render(<Blog blog={blog} updateBlog={vi.fn()} deleteBlog={vi.fn()} />)

    expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
    expect(screen.getByText(blog.author, { exact: false })).toBeDefined()
    expect(screen.queryByText(blog.url, { exact: false })).toBeNull()
    expect(screen.queryByText(`likes: ${blog.likes}`, { exact: false })).toBeNull()
  })

  test('renders url and likes when the view button has been clicked', async () => {
    render(<Blog blog={blog} updateBlog={vi.fn()} deleteBlog={vi.fn()} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText(blog.url, { exact: false })).toBeDefined()
    expect(screen.getByText(`likes: ${blog.likes}`, { exact: false })).toBeDefined()
  })

  test('clicking the like button twice calls props\'s event handle twice', async () => {
    const updateBlog = vi.fn()
    render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={vi.fn()} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})