import { User } from "../components/UserList"
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

const UserView = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)
  return (
    <div>
      <User user={user} />
    </div>
  )
}

export default UserView