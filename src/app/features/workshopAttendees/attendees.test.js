import {
  attendeesReducer,
  initialState,
  addAttendee,
  addCoach,
  addStudent,
  studentsSelector,
  coachesSelector,
  parseAttendeeList
} from './attendees'
import pairingCsvParser from './csv/pairingCsvParser'


describe('The Attendees Slice', () => {

  describe('Actions', () => {

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
        expect(studentsSelector({attendees: nextState})[0]).toMatchObject(newStudent)
      })
      it('copies the available information for coaches', () => {
        const nextState = attendeesReducer(initialState, addCoachAction)
        expect(coachesSelector({attendees: nextState})[0]).toMatchObject(newCoach)
      })
      it('generates an id', () => {
        const firstState = attendeesReducer(initialState, addStudentAction)
        const secondState = attendeesReducer(firstState, addCoachAction)

        expect(studentsSelector({attendees: secondState})[0]).toMatchObject({id: 1})
        expect(coachesSelector({attendees: secondState})[0]).toMatchObject({id: 2})
        expect(secondState.nextId).toBe(3)
      })
      it('initializes attendance to no', () => {
        const firstState = attendeesReducer(initialState, addStudentAction)
        const secondState = attendeesReducer(firstState, addCoachAction)

        expect(studentsSelector({attendees: secondState})[0]).toMatchObject({attendance: false})
        expect(coachesSelector({attendees: secondState})[0]).toMatchObject({attendance: false})
      })
      it('ignores duplicates', () => {
        const firstState = attendeesReducer(initialState, addStudentAction)
        const secondState = attendeesReducer(firstState, addStudentAction)
        expect(studentsSelector({attendees: secondState}).length).toBe(1)

        const thirdState = attendeesReducer(secondState, addCoachAction)
        const fourthState = attendeesReducer(thirdState, addCoachAction)
        expect(coachesSelector({attendees: fourthState}).length).toBe(1)
      })
    })

  })

  describe('Thunks', () => {
    const dispatch = jest.fn()

    describe('Parsing the attendees list file', () => {
      const file = {
        text: () => Promise.resolve(
          'New attendee,Name,Role,Tutorial,Note,Skills\n' +
          'false,Angelina Jolie (she),Student,JS: Building your own app,"I am learning HTML, CSS and Javascript",N/A\n' +
          'false,Leonardo Dicaprio (he),Coach,N/A,"Git, Python and Java would be good for me to do pair.","heroku, ruby, Test, nodejs, javascript, docker, testing, TDD, java, shellscript, deploy"\n'
        )
      }

      it('adds the students and coaches from the input', async () => {
        pairingCsvParser.parse = jest.fn(() => [
          {name: 'Angelina Jolie (she)', role: 'Coach', new: false},
          {name: 'Leonardo Dicaprio (he)', role: 'Student', new: false}
        ])

        await parseAttendeeList(file)(dispatch)

        expect(dispatch).toHaveBeenNthCalledWith(1, addAttendee({name: 'Angelina Jolie (she)', role: 'Coach', new: false}))
        expect(dispatch).toHaveBeenNthCalledWith(2, addAttendee({name: 'Leonardo Dicaprio (he)', role: 'Student', new: false}))
      })

    })

  })

})
