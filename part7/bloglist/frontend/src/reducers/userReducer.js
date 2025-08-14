import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      loginService.setToken(user.token)
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      loginService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: 'Wrong username or password',
      }, 5))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    loginService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
