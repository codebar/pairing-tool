import {
  settingsReducer,
  initialState,
  selectLanguageDetectionRules,
  selectLanguageNames
} from './settingsSlice'

describe('The Settings Slice', () => {

  it('contains the list of languages to work with', () => {
    const nextState = settingsReducer(initialState, {})
    const languageNames = selectLanguageNames({settings: nextState})
    expect(languageNames).toEqual(['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java', 'PHP', 'Other'])
  })

  it('can see the language detection rules', () => {
    const nextState = settingsReducer(initialState, {})
    const languageDetectionRules = selectLanguageDetectionRules({settings: nextState})
    expect(languageDetectionRules).toContainEqual({name: 'Java', alias: [], exclusions:['javascript']})
  })

})
