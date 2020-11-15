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
    moveCoachToGroup: (state, action) => {
      const coach = state.coaches.find(coach => coach.id === action.payload.coachId)
      state.coaches = state.coaches.filter(coach => coach.id !== action.payload.coachId)
      const groupIndex = state.groups.findIndex(group => group.id === action.payload.groupId)
      state.groups[groupIndex].coaches.push(coach)
    },
    moveStudentToGroup: (state, action) => {

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


export const dragCoachToGroup = (coachId, groupId) => (dispatch, getState) => {
  dispatch(moveCoachToGroup({coachId, groupId}))
  const state = getState()
  const weDoNeedANewGroup = state.pairings.groups.some(group => group.students.length === 0 && group.coaches.length === 0)
  if (weDoNeedANewGroup) dispatch(createNewGroup())
}


export const resolveSingleOptionPairings = () => dispatch => {
}
