import {
  configurationReducer,
  initialState,
  selectLanguageDetectionRules,
  selectLanguageNames
} from './configurationSlice'

describe('The Configuration Slice', () => {

  it('contains the list of languages to work with', () => {
    const nextState = configurationReducer(initialState, {})
    const languageNames = selectLanguageNames({configuration: nextState})
    expect(languageNames).toEqual(['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java', 'PHP', 'Other'])
  })

  it('can see the language detection rules', () => {
    const nextState = configurationReducer(initialState, {})
    const languageDetectionRules = selectLanguageDetectionRules({configuration: nextState})
    expect(languageDetectionRules).toContainEqual({name: 'Java', alias: [], exclusions:['javascript']})
  })

})
