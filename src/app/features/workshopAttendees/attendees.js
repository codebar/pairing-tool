import {createSlice} from '@reduxjs/toolkit'
import deepEqual from 'deep-equal'
import {parse} from './csv/pairingCsvParser'

export const initialState = {
  students: [],
  coaches: [],
  nextStudentId: 1,
  nextCoachId: 1
}

const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const studentExists = ({id, ...fields}) => deepEqual(fields, action.payload)
      if (!state.students.some(studentExists)) {
        state.students.push({...action.payload, id: state.nextStudentId})
        state.nextStudentId += 1
      }
    },
    addCoach: (state, action) => {
      const coachExists = ({id, ...fields}) => deepEqual(fields, action.payload)
      if (!state.coaches.some(coachExists)) {
        state.coaches.push({...action.payload, id: state.nextCoachId})
        state.nextCoachId += 1
      }
    }
  }
})
export const attendeesReducer = attendeesSlice.reducer
export const {addStudent, addCoach} = attendeesSlice.actions

// SELECTORS
export const studentsSelector = state => state.attendees.students
export const coachesSelector = state => state.attendees.coaches

// THUNKS
export const parseAttendeeList = file => async dispatch => {
  try {
    const csv = await file.text()
    const result = parse(csv)
    result.students.forEach(student => dispatch(addStudent(student)))
    result.coaches.forEach(coach => dispatch(addCoach(coach)))
  } catch (e) {
    console.error(e)
  }
}
