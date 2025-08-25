import LoginForm from "../components/LoginForm"

const LoginView = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <LoginForm setToken={props.setToken} setPage={props.setPage} />
    </div>
  )
}

export default LoginView