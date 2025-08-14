import { useSelector } from 'react-redux'
import NavigationLink from './NavigationLink'

export const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><NavigationLink to={`/users/${user.id}`}>{user.name}</NavigationLink></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList