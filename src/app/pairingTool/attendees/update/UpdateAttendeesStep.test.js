import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {renderComponent, testStore} from '../../../../test/testUtils'
import {stateAfterParsingCsv} from '../../../../test/fixtures/attendees'
import {addAttendee} from '../attendeesSlice'
import {UpdateAttendeesStep} from './UpdateAttendeesStep'

describe('The Update Attendees Step', () => {

  const render = () => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch = jest.fn()
    renderComponent(<UpdateAttendeesStep/>, store)
    return {store}
  }
  const button = (label) => screen.getByRole('button', {name: label})
  const textField = (label) => screen.queryByRole('textbox', {name : label})

  it('Adds a new attendee', () => {
    const {store} = render()
    const newAttendeeButton = button('')

    userEvent.click(newAttendeeButton)
    const newAttendee = {name: '', role: 'Student', languages: [], attendance: true}
    expect(store.dispatch).toHaveBeenCalledWith(addAttendee(newAttendee))
  })

  it('Select attendees for modification', () => {
    render()

    const chewbaccaCard = screen.getByText('Chewbacca')
    userEvent.click(chewbaccaCard)
    expect(textField(/name/i).value).toBe('Chewbacca')

    const yodaCard = screen.getByText('Yoda')
    userEvent.click(yodaCard)
    expect(textField(/name/i).value).toBe('Yoda')

    userEvent.click(yodaCard)
    expect(textField(/name/i)).not.toBeInTheDocument()
  })

  it('Navigates to the pairings step', () => {
    const { store } = render()

    userEvent.click(button(/continue to pairings/i))
    expect(store.dispatch).toHaveBeenCalled()
    // thunk actions are a bit more cheeky and hard to test :(
    // waiting to see if the fixes in the pairing screens will remove the need of a thunk in the first place
  })

})
