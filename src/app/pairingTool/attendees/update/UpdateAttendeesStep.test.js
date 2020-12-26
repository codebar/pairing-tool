import {renderComponent, testStore} from '../../../../test/testUtils'
import userEvent from '@testing-library/user-event'
import {storeAfterCsv} from '../../../../test/fixtures/store-after-csv'
import {selectAttendees} from '../attendeesSlice'
import {UpdateAttendeesStep} from './UpdateAttendeesStep'
import {overrideToggle} from '../../../../config/togglesSlice'

describe('The Update Attendees Step', () => {
    const render = (toggle = {toggle: 'updateAttendeesNewScreen', value: 'false'}) => {
        const store = testStore(storeAfterCsv)
        store.dispatch(overrideToggle(toggle))

        const renderResult = renderComponent(<UpdateAttendeesStep/>, store)
        return {
            ...renderResult,
            store,
            addNewAttendeeButton: () => renderResult.getByTestId('add-new-attendee-button'),
            attendeesList: () => renderResult.getByTestId('attendees-list'),
            attendeeEditForm: () => renderResult.getByTestId('attendee-edit-form'),
            attendeeDisplayNames: () => renderResult.getAllByTestId('attendee-display-name')
        }
    }

    describe('with new update attendees screen', () => {
        const withNewScreenEnabled = {toggle: 'updateAttendeesNewScreen', value: 'true'}

        it('renders initial elements and controls', () => {
            const {addNewAttendeeButton, attendeesList, attendeeEditForm} = render(withNewScreenEnabled)

            expect(addNewAttendeeButton()).toBeInTheDocument()
            expect(attendeesList()).toBeInTheDocument()
            expect(attendeeEditForm()).toBeInTheDocument()
        })

        it('can add a new attendee', () => {
            const {addNewAttendeeButton, attendeeDisplayNames, store} = render(withNewScreenEnabled)
            const numberOfAttendees = selectAttendees(store.getState()).length

            expect(attendeeDisplayNames().length).toBe(numberOfAttendees)
            userEvent.click(addNewAttendeeButton())
            expect(attendeeDisplayNames().length).toBe(numberOfAttendees + 1)
        })
    })
})
