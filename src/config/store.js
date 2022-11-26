import {configureStore} from '@reduxjs/toolkit'
import {togglesReducer} from './togglesSlice'
import {settingsReducer, initialState as settings} from '../app/settings/settingsSlice'
import {attendeesReducer, initialState as attendees} from '../app/pairingTool/attendees/attendeesSlice'
import {pairingsReducer, initialState as pairings} from '../app/pairingTool/pairings/pairingsSlice'
import {featureToggles as toggles} from './featureToggles'

export const storeInitialState = {
  toggles,
  settings,
  attendees,
  pairings
}

export const createStore = (preloadedState = storeInitialState) => configureStore({
  reducer: {
    toggles: togglesReducer,
    settings: settingsReducer,
    attendees: attendeesReducer,
    pairings: pairingsReducer
  },
  preloadedState
})
