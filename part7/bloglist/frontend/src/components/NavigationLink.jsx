import { Link } from 'react-router-dom'

const NavigationLink = ({ to, children, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

export default NavigationLink