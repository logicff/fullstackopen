import '../style/Notifications.css';

const Notifications = (props) => {
  const notification = props.notification
  if (notification === null) {
    return null
  }

  const type = notification.type
  const message = notification.message

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notifications