import {
    overrideToggle,
    togglesReducer
} from './togglesSlice'

describe('The Toggles Slice', () => {

    describe('Overriding default toggle values', () => {

        it('does nothing if the toggle does not exist', () => {
            const action = overrideToggle({toggle: 'non-existing', value: 'false'})
            const state = {}

            const nextState = togglesReducer(state, action)

            expect(nextState).toEqual(state)
        })

        it('overrides a toggle to false', () => {
            const action = overrideToggle({toggle: 'existing', value: 'false'})
            const state = {existing: true}

            const nextState = togglesReducer(state, action)

            expect(nextState.existing).toBeFalsy()
        })

        it('overrides a toggle to true', () => {
            const action = overrideToggle({toggle: 'existing', value: 'true'})
            const state = {existing: false}

            const nextState = togglesReducer(state, action)

            expect(nextState.existing).toBeTruthy()
        })


    })
})
