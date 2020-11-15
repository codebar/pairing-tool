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

export const resolveSingleOptionPairings = () => dispatch => {
}
