import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {renderComponent, testStore} from '../../../../test/testUtils'
import {stateAfterParsingCsv} from '../../../../test/fixtures/attendees'
import {overrideToggle} from '../../../../config/togglesSlice'
import {addAttendee} from '../attendeesSlice'
import {UpdateAttendeesStep} from './UpdateAttendeesStep'

describe('The Update Attendees Step', () => {

  const render = (toggle = {toggle: 'updateAttendeesNewScreen', value: 'false'}) => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch(overrideToggle(toggle))
    store.dispatch = jest.fn()
    const renderResult = renderComponent(<UpdateAttendeesStep/>, store)
    const testId = name => `update-attendees-step-${name}`
    return {
      ...renderResult,
      store,
      newAttendeeButton: () => renderResult.queryByTestId(testId('new-attendee')),
      attendeesList: () => renderResult.queryByTestId(testId('list')),
      goToPairingsButton: () => renderResult.queryByTestId(testId('pairing')),
      attendeeEditor: () => renderResult.queryByTestId('attendee-editor')
    }
  }

  describe('With new update attendees screen', () => {
    const withNewScreenEnabled = {toggle: 'updateAttendeesNewScreen', value: 'true'}

    it('Adds a new attendee', () => {
      const {newAttendeeButton, store} = render(withNewScreenEnabled)

      userEvent.click(newAttendeeButton())
      const newAttendee = {name: '', role: 'Student', languages: [], attendance: true}
      expect(store.dispatch).toHaveBeenCalledWith(addAttendee(newAttendee))
    })

    it('Select attendees for modification', () => {
      const {attendeeEditor} = render(withNewScreenEnabled)

      userEvent.click(screen.getByText('Chewbacca'))
      expect(attendeeEditor()).toBeInTheDocument()
      expect(attendeeEditor().innerHTML).toContain('Chewbacca')

      const yodaCard = screen.getByText('Yoda')
      userEvent.click(yodaCard)
      expect(attendeeEditor().innerHTML).toContain('Yoda')

      userEvent.click(yodaCard)
      expect(attendeeEditor()).not.toBeInTheDocument()
    })

    it('Navigates to the pairings step', () => {
      const { goToPairingsButton, store } = render(withNewScreenEnabled)

      userEvent.click(goToPairingsButton())
      expect(store.dispatch).toHaveBeenCalled()
      // thunk actions are a bit more cheeky and hard to test :(
      // waiting to see if the fixes in the pairing screens will remove the need of a thunk in the first place
    })
  })

})
