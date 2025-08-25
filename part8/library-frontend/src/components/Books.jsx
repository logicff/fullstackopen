import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({ genre }) => {
  // 不把 hook 放在任何 return 前面的话，可能会被 React 编译器优化中视为潜在风险 
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">author</th>
            <th scope="col">published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
