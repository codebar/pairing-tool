import {configureStore} from '@reduxjs/toolkit'
import {configurationReducer as configuration} from '../app/configuration/configurationSlice'
import {attendeesReducer as attendees} from '../app/pairingTool/attendees/attendeesSlice'
import {pairingsReducer as pairings} from '../app/pairingTool/pairings/pairingsSlice'

export default configureStore({
  reducer: {
    configuration,
    attendees,
    pairings
  }
})
