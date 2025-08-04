const LogInfo = (props) => {
  const name = props.name
  const handleLogout = props.handleLogout
  return(
    <div>
      {name} logged-in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogInfo