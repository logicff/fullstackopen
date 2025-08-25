import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import Authors from "../components/Authors"
import EditAuthor from "../components/EditAuthor"

const AuthorsView = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <Authors authors={authors} />
      <EditAuthor authors={authors} />
    </div>
  )
}

export default AuthorsView