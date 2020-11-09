import {
  attendeesReducer,
  initialState,
  addCoach,
  addStudent,
  studentsSelector,
  coachesSelector,
  parseAttendeeList
} from './attendees'
import pairingCsvParser from './csv/pairingCsvParser'


describe('The Attendees Slice', () => {

  describe('Actions', () => {

    describe('Adding a new student', () => {
      const newStudent = {
        name: 'Pedro',
        new: false,
        tutorial: 'JS: Building your own app',
        notes: 'I am learning to build websites with HTML, CSS and Javascript',
        languages: ['HTML', 'CSS', 'JS']
      }
      const action = addStudent(newStudent)

      it('copies the available information', () => {
        const nextState = attendeesReducer(initialState, action)
        expect(studentsSelector({attendees: nextState})[0]).toMatchObject(newStudent)
      })

      it('generates an id', () => {
        const state = {...initialState, nextStudentId: 1}
        const nextState = attendeesReducer(state, action)
        expect(studentsSelector({attendees: nextState})[0]).toMatchObject({id: 1})
        expect(nextState.nextStudentId).toBe(2)
      })

      it('ignore duplicates', () => {
        const firstState = attendeesReducer(initialState, action)
        const secondState = attendeesReducer(firstState, action)
        expect(studentsSelector({attendees: secondState}).length).toBe(1)
      })
    })

    describe('Adding a new coach', () => {
      const newCoach = {name: 'Pedro', languages: ['HTML', 'CSS']}
      const action = addCoach(newCoach)

      it('copies the available information', () => {
        const nextState = attendeesReducer(initialState, action)
        expect(coachesSelector({attendees: nextState})[0]).toMatchObject(newCoach)
      })

      it('generates an id', () => {
        const state = {...initialState, nextCoachId: 1}
        const nextState = attendeesReducer(state, action)
        expect(coachesSelector({attendees: nextState})[0]).toMatchObject({id: 1})
        expect(nextState.nextCoachId).toBe(2)
      })

      it('ignore duplicates', () => {
        const firstState = attendeesReducer(initialState, action)
        const secondState = attendeesReducer(firstState, action)
        expect(coachesSelector({attendees: secondState}).length).toBe(1)
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
        pairingCsvParser.parse = jest.fn(() => ({
          students: [{name: 'Angelina Jolie (she)', new: false}],
          coaches: [{name: 'Leonardo Dicaprio (he)', new: false}]
        }))

        await parseAttendeeList(file)(dispatch)

        expect(dispatch).toHaveBeenNthCalledWith(1, addStudent({name: 'Angelina Jolie (she)', new: false}))
        expect(dispatch).toHaveBeenNthCalledWith(2, addCoach({name: 'Leonardo Dicaprio (he)', new: false}))
      })
    })
  })

})
