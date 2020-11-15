import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  languages: ['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java', 'Other']
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {}
})
export const configurationReducer = configurationSlice.reducer

export const languagesSelector = state => state.configuration.languages
