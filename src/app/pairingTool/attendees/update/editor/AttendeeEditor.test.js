import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/react'
import {renderComponent, testStore} from '../../../../../test/testUtils'
import {coach, stateAfterParsingCsv, student} from '../../../../../test/fixtures/attendees'
import {
  toggleAttendance,
  toggleLanguage,
  toggleRole,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial
} from '../../attendeesSlice'
import {AttendeeEditor} from './AttendeeEditor'

describe('The Attendee Editor', () => {

  const render = attendee => {
    const store = testStore(stateAfterParsingCsv)
    store.dispatch = jest.fn()
    const renderResult = renderComponent(<AttendeeEditor attendee={attendee} />, store)
    const testId = name => `attendee-editor-${name}`
    return {
      ...renderResult,
      store,
      firstTimerIcon: renderResult.queryByTestId(testId('new')),
      languageButton: language => renderResult.queryByTestId(testId(`language-${language}`))
    }
  }

  describe('The name input', () => {
    const attendee = {...student, name: 'Anakin Skywalker'}

    it('renders with the name of the attendee', () => {
      render(attendee)
      const nameInput = screen.getByRole('textbox', {name: /name/i})
      expect(nameInput.value).toBe('Anakin Skywalker')
    })

    it('updates the name of the attendee', () => {
      const {store} = render(attendee)
      const nameInput = screen.getByRole('textbox', {name: /name/i})

      userEvent.clear(nameInput)
      userEvent.type(nameInput, 'Darth Vader')
      expect(nameInput.value).toBe('Darth Vader')

      userEvent.tab()
      expect(store.dispatch).toHaveBeenCalledWith(updateAttendeeName({id: attendee.id, name: 'Darth Vader'}))
    })
  })

  describe('The attendance switch', () => {
    it('renders with the attendee attendance when its off', () => {
      render({ ...student, attendance: false })
      const attendanceSwitch = screen.queryByRole('checkbox', {name: /attendance/i})
      expect(attendanceSwitch).not.toBeChecked()
    })

    it('renders with the attendance when its on', () => {
      render({ ...student, attendance: true })
      const attendanceSwitch = screen.queryByRole('checkbox', {name: /attendance/i})
      expect(attendanceSwitch).toBeChecked()
    })

    it('toggles the attendance', () => {
      const attendee = { ...student, attendance: false }
      const {store} = render(attendee)

      const attendanceSwitch = screen.queryByRole('checkbox', {name: /attendance/i})
      userEvent.click(attendanceSwitch)

      expect(attendanceSwitch).toBeChecked()
      expect(store.dispatch).toHaveBeenCalledWith(toggleAttendance(attendee.id))
    })
  })

  describe('The role radio buttons', () => {
    const expectStudentIsChecked = (studentRadioButton, coachRadioButton) => {
      expect(studentRadioButton).toBeChecked()
      expect(coachRadioButton).not.toBeChecked()
    }
    const expectCoachIsChecked = (studentRadioButton, coachRadioButton) => {
      expect(studentRadioButton).not.toBeChecked()
      expect(coachRadioButton).toBeChecked()
    }
    const radioButton = (pattern) => screen.getByRole('radio', {name: pattern})

    it('renders with student selected for students', () => {
      render(student)
      expectStudentIsChecked(
        radioButton(/student/i),
        radioButton(/coach/i)
      )
    })

    it('renders with coach selected for coaches', () => {
      render(coach)
      expectCoachIsChecked(
        radioButton(/student/i),
        radioButton(/coach/i)
      )
    })

    it('toggles the attendee role', () => {
      const {store} = render(student)
      const studentRadioButton = radioButton(/student/i)
      const coachRadioButton = radioButton(/coach/i)

      userEvent.click(coachRadioButton)
      expectCoachIsChecked(studentRadioButton, coachRadioButton)
      expect(store.dispatch).toHaveBeenCalledWith(toggleRole(student.id))

      userEvent.click(studentRadioButton)
      expectStudentIsChecked(studentRadioButton, coachRadioButton)
      expect(store.dispatch).toHaveBeenCalledWith(toggleRole(student.id))
    })
  })

  describe('The notes textarea', () => {
    const attendee = {...coach, notes: 'I can teach many things'}

    it('renders with the notes of the attendee', () => {
      render(attendee)
      const notesTextarea = screen.getByRole('textbox', {name: /notes/i})
      expect(notesTextarea.value).toBe('I can teach many things')
    })

    it('updates the notes of the attendee', () => {
      const {store} = render(attendee)
      const notesTextarea = screen.getByRole('textbox', {name: /notes/i})

      const newNotes = 'I will be able to teach this and that \n and that too'

      userEvent.clear(notesTextarea)
      userEvent.type(notesTextarea, newNotes)
      expect(notesTextarea.value).toBe(newNotes)

      userEvent.tab()
      expect(store.dispatch).toHaveBeenCalledWith(updateAttendeeNotes({id: attendee.id, notes: newNotes}))
    })
  })

  describe('The skills textarea', () => {
    it('renders with the skills of the attendee when they are set', () => {
      render({...coach, skills: 'clean code and testing'})
      const skillsTextarea = screen.getByRole('textbox', {name: /skills/i})

      expect(skillsTextarea.value).toBe('clean code and testing')
    })

    it('renders empty string when the skills of the attendee are not set', () => {
      render(student)
      const skillsTextarea = screen.getByRole('textbox', {name: /skills/i})

      expect(skillsTextarea.value).toBe('')
    })

    it('updates the skills of the attendee', () => {
      const attendee = {...coach, skills: 'clean code and testing'}
      const {store} = render(attendee)
      const skillsTextarea = screen.getByRole('textbox', {name: /skills/i})

      const newSkills = 'I can do refactors, test, and more'
      userEvent.clear(skillsTextarea)
      userEvent.type(skillsTextarea, newSkills)
      expect(skillsTextarea.value).toBe(newSkills)

      userEvent.tab()
      expect(store.dispatch).toHaveBeenCalledWith(updateAttendeeSkills({id: attendee.id, skills: newSkills}))
    })
  })

  describe('The tutorial input', () => {
    it('renders with the tutorial of the attendee when it is set', () => {
      render({...student, tutorial: 'JS: Basics'})
      const tutorialTextField = screen.getByRole('textbox', {name: /tutorial/i})

      expect(tutorialTextField.value).toBe('JS: Basics')
    })

    it('renders empty string when the tutorial of the attendee is not set', () => {
      render(coach)
      const tutorialTextField = screen.getByRole('textbox', {name: /tutorial/i})

      expect(tutorialTextField.value).toBe('')
    })

    it('updates the tutorial of the attendee', () => {
      const attendee = {...student, tutorial: 'JS: Basics'}
      const {store} = render(attendee)
      const tutorialTextField = screen.getByRole('textbox', {name: /tutorial/i})

      const newTutorial = 'JS: Advanced'
      userEvent.clear(tutorialTextField)
      userEvent.type(tutorialTextField, newTutorial)
      expect(tutorialTextField.value).toBe(newTutorial)

      userEvent.tab()
      expect(store.dispatch).toHaveBeenCalledWith(updateAttendeeTutorial({id: attendee.id, tutorial: newTutorial}))
    })
  })

  describe('The languages buttons', () => {
    const attendee = {...student, languages: ['HTML', 'CSS', 'JS']}

    it.skip('renders the language buttons as active for the skills of the attendee', () => {
      const {languageButton} = render(attendee)
      expect(languageButton('HTML')).toHaveClass('Active')
      expect(languageButton('Java')).toHaveClass('Inactive')
    })

    it.skip('toggles a language of an attendee when clicking on the button', () => {
      const {languageButton, store} = render(attendee)

      userEvent.click(languageButton('SQL'))
      expect(languageButton('SQL')).toHaveClass('Active')
      expect(store.dispatch).toHaveBeenCalledWith(toggleLanguage({id: attendee.id, language: 'SQL'}))

      userEvent.click(languageButton('SQL'))
      expect(languageButton('SQL')).toHaveClass('Inactive')
      expect(store.dispatch).toHaveBeenCalledWith(toggleLanguage({id: attendee.id, language: 'SQL'}))
    })
  })

})
