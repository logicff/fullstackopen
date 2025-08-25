import { useQuery } from "@apollo/client"
import Books from "../components/Books"
import { ME } from "../queries"

const RecommendView = (props) => {
  const result = useQuery(ME, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const me = result.data.me

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {me.favoriteGenre || 'all'}</p>
      <Books genre={me.favoriteGenre} />
    </div>
  )
}

export default RecommendView