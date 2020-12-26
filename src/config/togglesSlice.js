import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    updateAttendeesNewScreen: false
}

const togglesSlice = createSlice({
    name: 'toggles',
    initialState,
    reducers: {
        overrideToggle: (state, action) => {
            state[action.payload.toggle] = action.payload.value === 'true'
        }
    }
})

export const togglesReducer = togglesSlice.reducer
export const {overrideToggle} = togglesSlice.actions

export const featureEnabled = featureName => state => state.toggles[featureName]
