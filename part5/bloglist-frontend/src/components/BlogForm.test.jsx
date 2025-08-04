import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const bloginfo = {
    title: 'Component testing with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com'
  }
  
  test('calls onSubmit with the right details', async () => {
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const input1 = screen.getByPlaceholderText('write blog title here')
    const input2 = screen.getByPlaceholderText('write blog author here')
    const input3 = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')
    await user.type(input1, bloginfo.title)
    await user.type(input2, bloginfo.author)
    await user.type(input3, bloginfo.url)
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(bloginfo)
  })
})