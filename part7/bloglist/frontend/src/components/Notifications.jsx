import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'
import '../style/Notifications.css'

const Notifications = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  const type = notification.type
  const message = notification.message

  return (
    <Alert severity={type}>
      {message}
    </Alert>
  )
}

export default Notifications