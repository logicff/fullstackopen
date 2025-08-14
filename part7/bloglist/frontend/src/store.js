import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: userListReducer,
    notification: notificationReducer,
  }
})

export default store
