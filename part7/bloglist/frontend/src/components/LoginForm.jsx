import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { TextField, Button, Box } from '@mui/material'

const LoginForm = () => {
  const [usernameField, resetUsername] = useField('text')
  const [passwordField, resetPassword] = useField('password')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username: usernameField.value,
      password: passwordField.value
    }
    dispatch(loginUser(credentials))

    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleLogin}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <TextField
          label="username"
          name="Password"
          {...usernameField}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          label="password"
          name="Username"
          {...passwordField}
          required
          fullWidth
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm