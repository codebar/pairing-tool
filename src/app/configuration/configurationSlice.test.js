import {
    configurationReducer,
    initialState,
    selectLanguages
} from './configurationSlice'

describe('The Configuration Slice', () => {
    it('contains the list of languages to work with', () => {
        const nextState = configurationReducer(initialState, {})
        expect(selectLanguages({configuration: nextState})).toEqual(initialState.languages)
    })
})
