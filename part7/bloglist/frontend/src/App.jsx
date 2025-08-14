import { useEffect } from 'react'
import Menu from './components/Menu'
import Notifications from './components/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'
import LoginView from './views/LoginView'
import BlogsView from './views/BlogsView'
import BlogView from './views/BlogView'
import UsersView from './views/UsersView'
import UserView from './views/UserView'
import { Container, CssBaseline } from '@mui/material'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div>
        <Notifications />
        <LoginView />
      </div>
    )
  }

  return (
    <div>
      <CssBaseline enableColorScheme />
      <Menu />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Notifications />
        <Routes>
          <Route path='/users/:id' element={<UserView />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/blogs/:id' element={<BlogView />} />
          <Route path='/' element={<BlogsView />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App