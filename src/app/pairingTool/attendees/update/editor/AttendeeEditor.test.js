import {renderComponent, testStore} from '../../../../../test/testUtils'
import {coach, stateAfterParsingCsv, student} from '../../../../../test/fixtures/attendees'
import {overrideToggle} from '../../../../../config/togglesSlice'
import {AttendeeEditor} from './AttendeeEditor'

describe('The Attendee Editor', () => {

  const render = attendee => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch(overrideToggle({toggle: 'updateAttendeesNewScreen', value: 'true'}))
    const renderResult = renderComponent(<AttendeeEditor attendee={attendee} />, store)
    const extractHtmlTagFrom = tag => container => container.getElementsByTagName(tag)[0]
    const testId = name => `attendee-editor-${name}`
    return {
      ...renderResult,
      store,
      firstTimerIcon: () => renderResult.queryByTestId(testId('new')),
      nameInput: () => extractHtmlTagFrom('input')(renderResult.queryByTestId(testId('name'))),
      attendanceSwitch: () => extractHtmlTagFrom('input')(renderResult.queryByTestId(testId('attendance'))),
      studentRadioButton: () => extractHtmlTagFrom('input')(renderResult.queryByTestId(testId('role-student'))),
      coachRadioButton: () => extractHtmlTagFrom('input')(renderResult.queryByTestId(testId('role-coach'))),
      notesTextarea: () => extractHtmlTagFrom('textarea')(renderResult.queryByTestId(testId('notes'))),
      skillsTextarea: () => extractHtmlTagFrom('textarea')(renderResult.queryByTestId(testId('skills'))),
      tutorialInput: () => extractHtmlTagFrom('input')(renderResult.queryByTestId(testId('tutorial'))),
      languageButton: language => renderResult.queryByTestId(testId(`language-${language}`))
    }
  }

  it('renders a student with its existing information', () => {
    const attendee = {
      ...student,
      'new': false,
      attendance: true,
      languages: ['JS']
    }

    const editor = render(attendee)

    expect(editor.nameInput().value).toBe(attendee.name)
    expect(editor.attendanceSwitch()).toBeChecked()
    expect(editor.studentRadioButton()).toBeChecked()
    expect(editor.notesTextarea().value).toBe(attendee.notes)
    expect(editor.tutorialInput().value).toBe(attendee.tutorial)
    expect(editor.languageButton('JS')).toHaveClass('Active')

    expect(editor.firstTimerIcon()).not.toBeInTheDocument()
    expect(editor.coachRadioButton()).not.toBeChecked()
    expect(editor.skillsTextarea().value).toBe('')
    expect(editor.languageButton('HTML')).toHaveClass('Inactive')
  })

  it('renders a coach with its existing information', () => {
    const attendee = {
      ...coach,
      'new': true,
      attendance: false,
      languages: ['Java']
    }

    const editor = render(attendee)

    expect(editor.firstTimerIcon()).toBeInTheDocument()
    expect(editor.nameInput().value).toBe(attendee.name)
    expect(editor.attendanceSwitch()).not.toBeChecked()
    expect(editor.coachRadioButton()).toBeChecked()
    expect(editor.notesTextarea().value).toBe(attendee.notes)
    expect(editor.skillsTextarea().value).toBe(attendee.skills)
    expect(editor.languageButton('Java')).toHaveClass('Active')

    expect(editor.studentRadioButton()).not.toBeChecked()
    expect(editor.tutorialInput().value).toBe('')
    expect(editor.languageButton('JS')).toHaveClass('Inactive')
  })

})
