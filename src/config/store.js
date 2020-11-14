import {configureStore} from '@reduxjs/toolkit'
import {configurationReducer as configuration} from '../app/features/configuration/configurationSlice'
import {attendeesReducer as attendees} from '../app/features/attendees/attendeesSlice'
import {pairingsReducer as pairings} from '../app/features/pairings/pairingsSlice'

export default configureStore({
  reducer: {
    configuration,
    attendees,
    pairings
  }
})
