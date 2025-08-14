import NavigationLink from "./NavigationLink"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { AppBar, Toolbar, Container, Box, Button, Drawer, MenuItem, Divider } from "@mui/material"
import { alpha, styled } from '@mui/material/styles'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}))

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Button color="info" variant="text" size="small" component={NavigationLink} to="/">
              Blogs
            </Button>
            <Button color="info" variant="text" size="small" component={NavigationLink} to="/users">
              Users
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
              <span sx={{ fontSize: 'small' }}>{user.name}</span>
            </Box>
            <Button color="primary" variant="text" size="small" onClick={handleLogout}>
              logout
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

export default Menu