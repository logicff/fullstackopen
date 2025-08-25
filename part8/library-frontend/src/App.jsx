import { useState } from "react"
import { useApolloClient } from '@apollo/client'
import AuthorsView from "./views/AuthorsView"
import BooksView from "./views/BooksView"
import NewBook from "./components/NewBook"
import LoginView from "./views/LoginView"
import RecommendView from "./views/RecommendView"

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("login")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null
          ? <button onClick={() => setPage("login")}>login</button>
          : <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <AuthorsView show={page === "authors"} />

      <BooksView show={page === "books"} />

      <LoginView show={page === "login"} setToken={setToken} setPage={setPage} />

      <NewBook show={page === "add"} />

      <RecommendView show={page === "recommend"} />
    </div>
  )
}

export default App
