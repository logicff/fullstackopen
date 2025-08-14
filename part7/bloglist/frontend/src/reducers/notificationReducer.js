import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
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

export const setNotification = (notification, duration = 5) => {
  return dispatch => {
    dispatch(putNotification(notification))
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}

export default notificationSlice.reducer