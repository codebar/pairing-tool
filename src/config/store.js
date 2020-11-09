import {configureStore} from '@reduxjs/toolkit'
import {attendeesReducer as attendees} from '../app/features/workshopAttendees/attendees'

export default configureStore({
  reducer: {
    attendees
  }
})
