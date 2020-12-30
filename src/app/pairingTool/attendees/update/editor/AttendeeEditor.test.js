import {renderComponent, testStore} from '../../../../../test/testUtils'
import {stateAfterParsingCsv, student} from '../../../../../test/fixtures/attendees'
import {overrideToggle} from '../../../../../config/togglesSlice'
import {AttendeeEditor} from './AttendeeEditor'

describe('The Attendee Editor', () => {

  const render = attendee => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch(overrideToggle({toggle: 'updateAttendeesNewScreen', value: 'true'}))
    const renderResult = renderComponent(<AttendeeEditor attendee={attendee} />, store)
    return {
      ...renderResult,
      store,
      nameInput: () => renderResult.getByTestId('attendee-edit-name-input').getElementsByTagName('input')[0],
      studentRadioInput: () => renderResult.getByTestId('attendee-edit-role-student').getElementsByTagName('input')[0],
      coachRadioInput: () => renderResult.getByTestId('attendee-edit-role-coach').getElementsByTagName('input')[0],
    }
  }

  it('renders a student with its existing information', () => {
    const {nameInput, studentRadioInput, coachRadioInput} = render(student)

    expect(nameInput().value).toBe(student.name)
    expect(studentRadioInput()).toBeChecked()
    expect(coachRadioInput()).not.toBeChecked()
  })

})
