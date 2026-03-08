import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo', () => {
  const todo = {
    text: 'Component testing with react-testing-library',
    done: false
  }

  const onClickComplete = vi.fn()
  const onClickDelete = vi.fn()

  render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />)

  const element = screen.getByText('Component testing with react-testing-library')
  expect(element).toBeDefined()
})