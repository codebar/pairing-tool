import {createSlice} from '@reduxjs/toolkit'
import {featureToggles} from './featureToggles'
import {useSelector} from 'react-redux'

const togglesSlice = createSlice({
  name: 'toggles',
  initialState: featureToggles,
  reducers: {
    overrideToggle: (state, action) => {
      if (action.payload.toggle in state)
        state[action.payload.toggle] = action.payload.value === 'true'
    }
  }
})

export const togglesReducer = togglesSlice.reducer
export const {overrideToggle} = togglesSlice.actions

const featureEnabled = featureName => state => state.toggles[featureName]

export const useFeatureToggle = (featureName) => {
  return useSelector(featureEnabled(featureName))
}
