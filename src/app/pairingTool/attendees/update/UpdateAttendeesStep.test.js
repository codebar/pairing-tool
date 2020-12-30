import {renderComponent, testStore} from '../../../../test/testUtils'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {stateAfterParsingCsv} from '../../../../test/fixtures/attendees'
import {overrideToggle} from '../../../../config/togglesSlice'
import {selectAttendees} from '../attendeesSlice'
import {UpdateAttendeesStep} from './UpdateAttendeesStep'

describe('The Update Attendees Step', () => {

  const render = (toggle = {toggle: 'updateAttendeesNewScreen', value: 'false'}) => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch(overrideToggle(toggle))
    const renderResult = renderComponent(<UpdateAttendeesStep/>, store)
    return {
      ...renderResult,
      store,
      addNewAttendeeButton: () => renderResult.getByTestId('add-new-attendee-button'),
      attendeesList: () => renderResult.getByTestId('attendees-list'),
      attendeeDisplayNames: () => renderResult.getAllByTestId('attendee-display-name'),
      attendeeEditForm: () => renderResult.getByTestId('attendee-edit-form'),
    }
  }

  describe('with new update attendees screen', () => {
    const withNewScreenEnabled = {toggle: 'updateAttendeesNewScreen', value: 'true'}

    it('renders initial elements and controls', () => {
      const {addNewAttendeeButton, attendeesList} = render(withNewScreenEnabled)

      expect(addNewAttendeeButton()).toBeInTheDocument()
      expect(attendeesList()).toBeInTheDocument()
    })
    it('can add a new attendee', () => {
      const {addNewAttendeeButton, attendeeDisplayNames, store} = render(withNewScreenEnabled)
      const numberOfAttendees = selectAttendees(store.getState()).length
      expect(attendeeDisplayNames().length).toBe(numberOfAttendees)

      userEvent.click(addNewAttendeeButton())

      expect(attendeeDisplayNames().length).toBe(numberOfAttendees + 1)
    })
    it('can select an attendee for modification', () => {
      const {attendeeEditForm} = render(withNewScreenEnabled)

      userEvent.click(screen.getByText('Chewbacca'))

      expect(attendeeEditForm()).toBeInTheDocument()
      expect(attendeeEditForm().innerHTML).toContain('Chewbacca')
    })
  })
})
