import {configureStore} from '@reduxjs/toolkit'
import {attendeesReducer as attendees} from '../app/features/attendees/attendeesSlice'
import {configurationReducer as configuration} from '../app/features/configuration/configurationSlice'

export default configureStore({
  reducer: {attendees, configuration}
})
