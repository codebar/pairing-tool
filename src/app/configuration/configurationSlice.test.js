import {
  configurationReducer,
  initialState,
  selectLanguageNames
} from './configurationSlice'

describe('The Configuration Slice', () => {
  it('contains the list of languages to work with', () => {
    const nextState = configurationReducer(initialState, {})
    expect(selectLanguageNames({configuration: nextState})).toEqual(initialState.languages)
  })
})
