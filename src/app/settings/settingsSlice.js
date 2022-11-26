import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  languages: [
    { name: 'HTML', alias: [], exclusions: [] },
    { name: 'CSS', alias: [], exclusions: [] },
    { name: 'JS', alias: ['javascript', 'typescript'], exclusions: [] },
    { name: 'Python', alias: [], exclusions: [] },
    { name: 'Ruby', alias: [], exclusions: [] },
    { name: 'SQL', alias: [], exclusions: [] },
    { name: 'Java', alias: [], exclusions: ['javascript'] },
    { name: 'PHP', alias: [], exclusions: [] },
    { name: 'Other', alias: [], exclusions: [] }
  ]
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // todo: future steps add a config UI where languages can be added
    // colors for each language could also be configured
  }
})
export const settingsReducer = settingsSlice.reducer

export const selectLanguageNames = state =>
  state.settings.languages.map(language => language.name)

export const selectLanguageDetectionRules = state =>
  state.settings.languages.map(language => ({
    name: language.name,
    alias: language.alias,
    exclusions: language.exclusions
  }))
