import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../app/features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
