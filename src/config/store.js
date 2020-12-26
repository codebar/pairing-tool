import {configureStore} from '@reduxjs/toolkit'
import {togglesReducer, initialState as toggles} from './togglesSlice'
import {configurationReducer, initialState as configuration} from '../app/configuration/configurationSlice'
import {attendeesReducer, initialState as attendees} from '../app/pairingTool/attendees/attendeesSlice'
import {pairingsReducer, initialState as pairings} from '../app/pairingTool/pairings/pairingsSlice'

export const storeInitialState = {
  toggles,
  configuration,
  attendees,
  pairings
}

export const createStore = (preloadedState = storeInitialState) => configureStore({
  reducer: {
    toggles: togglesReducer,
    configuration: configurationReducer,
    attendees: attendeesReducer,
    pairings: pairingsReducer
  },
  preloadedState
})
