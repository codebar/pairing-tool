import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  languages: [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JS' },
    { name: 'Python' },
    { name: 'Ruby' },
    { name: 'SQL' },
    { name: 'Java' },
    { name: 'PHP' },
    { name: 'Other' }
  ]
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

export const selectLanguageNames = state => state.configuration.languages.map(language => language.name)
