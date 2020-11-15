import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  students: [],
  coaches: [],
  groups: [
    {id: 1, students: [], coaches: []},
  ],
  nextId: 2
}

const pairingsSlice = createSlice({
  name: 'pairings',
  initialState,
  reducers: {
    addPeopleForPairings: (state, action) => {
      state.students = action.payload.students
      state.coaches = action.payload.coaches
    },
    moveCoachToGroup: (state, {payload}) => {
      const groupIndex = state.groups.findIndex(group => group.id === payload.groupId)
      const coach = state.coaches.find(coach => coach.id === payload.coachId)
      state.groups[groupIndex].coaches.push(coach)
      state.coaches = state.coaches.filter(coach => coach.id !== payload.coachId)
    },
    moveStudentToGroup: (state, {payload}) => {
      const groupIndex = state.groups.findIndex(group => group.id === payload.groupId)
      const student = state.students.find(student => student.id === payload.studentId)
      state.groups[groupIndex].students.push(student)
      state.students = state.students.filter(student => student.id !== payload.studentId)
    },
    createNewGroup: state => {
      state.groups.push({id: state.nextId, students: [], coaches: []})
      state.nextId += 1
    }
  }
})
export const pairingsReducer = pairingsSlice.reducer

export const {
  addPeopleForPairings,
  createNewGroup,
  moveCoachToGroup,
  moveStudentToGroup
} = pairingsSlice.actions

export const selectAvailableStudents = state => state.pairings.students
export const selectAvailableCoaches = state => state.pairings.coaches
export const selectPairingGroups = state => state.pairings.groups

const createNewGroupIfNeeded = (dispatch, getState) => {
  const weDoNeedANewGroup = !selectPairingGroups(getState())
    .some(group => group.students.length === 0 && group.coaches.length === 0)
  if (weDoNeedANewGroup) dispatch(createNewGroup())
}
export const dragStudentToGroup = (studentId, groupId) => (dispatch, getState) => {
  dispatch(moveStudentToGroup({studentId, groupId}))
  createNewGroupIfNeeded(dispatch, getState)
}
export const dragCoachToGroup = (coachId, groupId) => (dispatch, getState) => {
  dispatch(moveCoachToGroup({coachId, groupId}))
  createNewGroupIfNeeded(dispatch, getState)
}
export const resolveSingleOptionPairings = () => dispatch => {
}
