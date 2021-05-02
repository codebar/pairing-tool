import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  languages: ['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java', 'PHP', 'Other']
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    // todo: future steps add a config UI where languages can be added
    // colors for each language could also be configured
  }
})
export const configurationReducer = configurationSlice.reducer

export const selectLanguageNames = state => state.configuration.languages
