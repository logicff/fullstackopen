import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import Books from "../components/Books"

const BooksView = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genres))
  )

  return (
    <div>
      <h2>books</h2>
      <p>in genre: {genre || 'all'}</p>
      <Books genre={genre} />
      <div>
        {allGenres.map(g =>
          <button
            key={g}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        )}
        <button onClick={() => setGenre('')}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default BooksView