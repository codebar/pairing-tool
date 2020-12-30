import {renderComponent, testStore} from '../../../../../test/testUtils'
import {coach, stateAfterParsingCsv, student} from '../../../../../test/fixtures/attendees'
import {overrideToggle} from '../../../../../config/togglesSlice'
import {AttendeeEditor} from './AttendeeEditor'

describe('The Attendee Editor', () => {


  const render = attendee => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch(overrideToggle({toggle: 'updateAttendeesNewScreen', value: 'true'}))
    const renderResult = renderComponent(<AttendeeEditor attendee={attendee} />, store)
    const htmlInputFrom = container => container.getElementsByTagName('input')[0]
    const htmlTextareaFrom = container => container.getElementsByTagName('textarea')[0]
    return {
      ...renderResult,
      store,
      nameInput: () => htmlInputFrom(renderResult.getByTestId('attendee-edit-name-input')),
      studentRadioInput: () => htmlInputFrom(renderResult.getByTestId('attendee-edit-role-student')),
      coachRadioInput: () => htmlInputFrom(renderResult.getByTestId('attendee-edit-role-coach')),
      notesInput: () => htmlInputFrom(renderResult.getByTestId('attendee-edit-notes-input')),
      skillsInput: () => htmlTextareaFrom(renderResult.getByTestId('attendee-edit-skills-input')),
      tutorialInput: () => htmlTextareaFrom(renderResult.getByTestId('attendee-edit-tutorial-input')),
    }
  }

  it('renders a student with its existing information', () => {
    const {
      nameInput,
      studentRadioInput,
      coachRadioInput,
      notesInput,
      skillsInput,
      tutorialInput
    } = render(student)

    expect(nameInput().value).toBe(student.name)
    expect(studentRadioInput()).toBeChecked()
    expect(notesInput().value).toBe(student.notes)
    expect(tutorialInput().value).toBe(student.tutorial)

    expect(coachRadioInput()).not.toBeChecked()
    expect(skillsInput()).toBeDisabled()
  })

  it('renders a coach with its existing information', () => {
    const {
      nameInput,
      studentRadioInput,
      coachRadioInput,
      notesInput,
      skillsInput,
      tutorialInput
    } = render(coach)

    expect(nameInput().value).toBe(coach.name)
    expect(coachRadioInput()).toBeChecked()
    expect(notesInput().value).toBe(coach.notes)
    expect(skillsInput().value).toBe(coach.skills)

    expect(studentRadioInput()).not.toBeChecked()
    expect(tutorialInput()).toBeDisabled()
  })

})
