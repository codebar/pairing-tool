import {
  attendeesReducer,
  initialState,
  selectStudents,
  selectCoaches,
  selectAttendeeById,
  selectReadyForPairing,
  addAttendee,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial,
  toggleAttendance,
  toggleRole,
  toggleLanguage,
  readyForPairing,
  reviewAttendeesAgain,
  parseAttendeeList,
  goToPairingStep
} from './attendeesSlice'
import {addPeopleForPairings} from '../pairings/pairingsSlice'
import pairingCsvParser from './csv/pairingCsvParser'

describe('The Attendees Slice', () => {

  describe('Adding a new attendee', () => {
    const newStudent = {
      name: 'Pedro',
      role: 'Student',
      new: false,
      tutorial: 'JS: Building your own app',
      notes: 'I am learning to build websites with HTML, CSS and Javascript',
      languages: ['HTML', 'CSS', 'JS']
    }
    const newCoach = {
      name: 'Alina',
      role: 'Coach',
      new: false,
      skills: 'web development with html, css and js',
      notes: 'I am a senior web developer with experience in js and frameworks',
      languages: ['HTML', 'CSS', 'JS']
    }
    const addStudentAction = addAttendee(newStudent)
    const addCoachAction = addAttendee(newCoach)

    it('copies the available information for students', () => {
      const nextState = attendeesReducer(initialState, addStudentAction)
      expect(selectStudents({attendees: nextState})[0]).toMatchObject(newStudent)
    })
    it('copies the available information for coaches', () => {
      const nextState = attendeesReducer(initialState, addCoachAction)
      expect(selectCoaches({attendees: nextState})[0]).toMatchObject(newCoach)
    })
    it('generates an id', () => {
      const firstState = attendeesReducer(initialState, addStudentAction)
      const secondState = attendeesReducer(firstState, addCoachAction)

      expect(selectStudents({attendees: secondState})[0]).toMatchObject({id: 1})
      expect(selectCoaches({attendees: secondState})[0]).toMatchObject({id: 2})
      expect(secondState.nextId).toBe(3)
    })
    it('initializes attendance to no', () => {
      const firstState = attendeesReducer(initialState, addStudentAction)
      const secondState = attendeesReducer(firstState, addCoachAction)

      expect(selectStudents({attendees: secondState})[0]).toMatchObject({attendance: false})
      expect(selectCoaches({attendees: secondState})[0]).toMatchObject({attendance: false})
    })
    it('ignores duplicates', () => {
      const firstState = attendeesReducer(initialState, addStudentAction)
      const secondState = attendeesReducer(firstState, addStudentAction)
      expect(selectStudents({attendees: secondState}).length).toBe(1)

      const thirdState = attendeesReducer(secondState, addCoachAction)
      const fourthState = attendeesReducer(thirdState, addCoachAction)
      expect(selectCoaches({attendees: fourthState}).length).toBe(1)
    })
  })

  describe('Updating the name of an attendee', () => {
    const action = updateAttendeeName({id: 1, name: 'New name'})

    it('overrides the attendee name with the new one', () => {
      const attendee = {id: 1, name: 'Old name'}
      const nextState = attendeesReducer({...initialState, list: [attendee]}, action)
      expect(selectAttendeeById(1)({attendees: nextState}).name).toBe('New name')
    })
  })

  describe('Updating the notes of an attendee', () => {
    const action = updateAttendeeNotes({id: 1, notes: 'New notes'})

    it('overrides the attendee notes with the new ones', () => {
      const attendee = {id: 1, notes: 'Old notes'}
      const nextState = attendeesReducer({...initialState, list: [attendee]}, action)
      expect(selectAttendeeById(1)({attendees: nextState}).notes).toBe('New notes')
    })
  })

  describe('Updating the skills of an attendee', () => {
    const action = updateAttendeeSkills({id: 1, skills: 'New skills'})

    it('overrides the attendee skills with the new ones', () => {
      const attendee = {id:1, skills: 'Old skills'}
      const nextState = attendeesReducer({...initialState, list: [attendee]}, action)
      expect(selectAttendeeById(1)({attendees: nextState}).skills).toBe('New skills')
    })
  })

  describe('Updating the tutorial of an attendee', () => {
    const action = updateAttendeeTutorial({id: 1, tutorial: 'New tutorial'})

    it('overrides the attendee tutorial with the new one', () => {
      const attendee = {id:1, tutorial: 'Old tutorial'}
      const nextState = attendeesReducer({...initialState, list: [attendee]}, action)
      expect(selectAttendeeById(1)({attendees: nextState}).tutorial).toBe('New tutorial')
    })
  })

  describe('Toggle attendance of an attendee', () => {
    const action = toggleAttendance(1)

    it('changes the attendance to true when it was false', () => {
      const student = {id: 1, attendance: false, role: 'Student'}
      const nextState = attendeesReducer({...initialState, list: [student]}, action)
      expect(selectStudents({attendees: nextState})[0]).toMatchObject({attendance: true})
    })
    it('changes the attendance to false when it was true', () => {
      const coach = {id: 1, attendance: true, role: 'Coach'}
      const nextState = attendeesReducer({...initialState, list: [coach]}, action)
      expect(selectCoaches({attendees: nextState})[0]).toMatchObject({attendance: false})
    })
  })

  describe('Toggle the role of an attendee', () => {
    const action = toggleRole(1)

    it('changes the role from student to coach', () => {
      const student = {id: 1, role: 'Student'}
      const nextState = attendeesReducer({...initialState, list: [student]}, action)
      expect(selectCoaches({attendees: nextState})[0]).toMatchObject({id: 1, role: 'Coach'})
    })
    it('changes the role from coach to student', () => {
      const coach = {id: 1, role: 'Coach'}
      const nextState = attendeesReducer({...initialState, list: [coach]}, action)
      expect(selectStudents({attendees: nextState})[0]).toMatchObject({id: 1, role: 'Student'})
    })
  })

  describe('Toggle language of an attendee', () => {
    const action = toggleLanguage({id: 1, language: 'HTML'})

    it('adds a skill to the attendee if the attendee did not had it', () => {
      const state = {
        ...initialState,
        list: [{id: 1, role: 'Student', languages: ['CSS', 'JS']}]
      }
      const nextState = attendeesReducer(state, action)
      expect(selectStudents({attendees: nextState})[0].languages).toContain('HTML')
    })
    it('removes a skill from the attendee if the attendee had it', () => {
      const state = {
        ...initialState,
        list: [{id: 1, role: 'Coach', languages: ['HTML', 'JS', 'Java']}]
      }
      const nextState = attendeesReducer(state, action)
      expect(selectCoaches({attendees: nextState})[0].languages).not.toContain('HTML')
    })
  })

  describe('Ready for pairing', () => {
    const action = readyForPairing()

    it('sets the flag as ready for pairing to true', () => {
      const nextState = attendeesReducer(initialState, action)
      expect(selectReadyForPairing({attendees: nextState})).toBeTruthy()
    })
  })

  describe('Review attendees again', () => {
    const action = reviewAttendeesAgain()

    it('sets the flag as ready for pairing to false', () => {
      const nextState = attendeesReducer(initialState, action)
      expect(selectReadyForPairing({attendees: nextState})).toBeFalsy()
    })
  })

  describe('Parsing the attendees list file', () => {
    const dispatch = jest.fn()
    const getState = () => ({configuration: {languages: []}})

    it('adds a new attendee for each input in the file', async () => {
      const file = {
        text: () => Promise.resolve(
          'New attendee,Name,Role,Tutorial,Note,Skills\n' +
          'false,Angelina Jolie (she),Student,JS: Building your own app,"I am learning HTML, CSS and Javascript",N/A\n' +
          'false,Leonardo Dicaprio (he),Coach,N/A,"Git, Python and Java would be good for me to do pair.","heroku, ruby, Test, nodejs, javascript, docker, testing, TDD, java, shellscript, deploy"\n'
        )
      }
      pairingCsvParser.parse = jest.fn(() => [
        {name: 'Angelina Jolie (she)', role: 'Coach', new: false},
        {name: 'Leonardo Dicaprio (he)', role: 'Student', new: false}
      ])

      await parseAttendeeList(file)(dispatch, getState)

      expect(dispatch).toHaveBeenNthCalledWith(1, addAttendee({
        name: 'Angelina Jolie (she)',
        role: 'Coach',
        new: false
      }))
      expect(dispatch).toHaveBeenNthCalledWith(2, addAttendee({
        name: 'Leonardo Dicaprio (he)',
        role: 'Student',
        new: false
      }))
    })
  })

  describe('Go to pairings step', () => {
    const dispatch = jest.fn()
    const getState = () => ({
      attendees: {
        list: [
          {name: 'Carmen San Diego', role: 'Student', attendance: false},
          {name: 'Bugs Bunny', role: 'Student', attendance: true},
          {name: 'Roger Rabbit', role: 'Coach', attendance: false},
          {name: 'Jessica Rabbit', role: 'Coach', attendance: true}
        ]
      }
    })

    it('marks the app as ready to go to the pairing step', () => {
      goToPairingStep()(dispatch, getState)
      expect(dispatch).toHaveBeenNthCalledWith(1, readyForPairing())
    })

    it('pass the list of coaches who showed up to the pairing step', () => {
      goToPairingStep()(dispatch, getState)
      const expectedListForPairings = {
        students: [{name: 'Bugs Bunny', role: 'Student', attendance: true}],
        coaches: [{name: 'Jessica Rabbit', role: 'Coach', attendance: true}]
      }
      expect(dispatch).toHaveBeenNthCalledWith(2, addPeopleForPairings(expectedListForPairings))
    })
  })

})
