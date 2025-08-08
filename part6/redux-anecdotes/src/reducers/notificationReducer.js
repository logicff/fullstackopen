import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    putNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  },
})

export const { putNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, duration = 5) => {
  return async dispatch => {
    dispatch(putNotification(message))
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}

export default notificationSlice.reducer