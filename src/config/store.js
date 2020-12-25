import {configureStore} from '@reduxjs/toolkit'
import {configurationReducer, initialState as configuration} from '../app/configuration/configurationSlice'
import {attendeesReducer, initialState as attendees} from '../app/pairingTool/attendees/attendeesSlice'
import {pairingsReducer, initialState as pairings} from '../app/pairingTool/pairings/pairingsSlice'

export const storeInitialState = {
    configuration,
    attendees,
    pairings
}

export const createStore = (preloadedState = storeInitialState) => configureStore({
    reducer: {
        configuration: configurationReducer,
        attendees: attendeesReducer,
        pairings: pairingsReducer
    },
    preloadedState
})
