import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  students: [],
  coaches: []
}

const pairingsSlice = createSlice({
  name: 'pairings',
  initialState,
  reducers: {
    addPeopleForPairings: (state, {payload}) => {
      const existingIds = []
        .concat(state.students.map(x => x.id))
        .concat(state.coaches.map(x => x.id))
      const removeDuplicates = (collection, existingIds) => collection.filter(x => !existingIds.includes(x.id))
      const extractFields = people => people.map(peep => (
        {id: peep.id, name: peep.name, languages: peep.languages, group: 0}
      ))
      state.students = state.students.concat(extractFields(removeDuplicates(payload.students, existingIds)))
      state.coaches = state.coaches.concat(extractFields(removeDuplicates(payload.coaches, existingIds)))
    },
    moveCoachToGroup: (state, {payload}) => {
      const coachIndex = state.coaches.findIndex(coach => coach.id === payload.coachId)
      state.coaches[coachIndex] = {...state.coaches[coachIndex], group: payload.groupId}
    },
    moveStudentToGroup: (state, {payload}) => {
      const studentIndex = state.students.findIndex(student => student.id === payload.studentId)
      state.students[studentIndex] = {...state.students[studentIndex], group: payload.groupId}
    }
  }
})
export const pairingsReducer = pairingsSlice.reducer

export const {
  addPeopleForPairings,
  moveCoachToGroup,
  moveStudentToGroup
} = pairingsSlice.actions

export const selectAvailableStudents = state => state.pairings.students.filter(student => student.group === 0)
export const selectAvailableCoaches = state => state.pairings.coaches.filter(coach => coach.group === 0)
export const selectPairingGroups = state =>
  addEmptyGroup(
    merge(
      pairings(state.pairings, 'students'),
      pairings(state.pairings, 'coaches')
    )
  )

const addEmptyGroup = groups => {
  const nextId = groups
    .map(x => x.id)
    .reduce((acc, id) => id > acc ? id : acc, 0) + 1
  return [...groups, {id: nextId, students: [], coaches: []}]
}

const merge = (pairings1, pairings2) => pairings1
  .concat(pairings2)
  .reduce((acc, group) => {
    const index = acc.findIndex(x => x.id === group.id)
    return index > -1
      ? [
        ...dropIndex(acc, index),
        {
          id: acc[index].id,
          students: [...acc[index].students, ...group.students],
          coaches: [...acc[index].coaches, ...group.coaches]
        }
      ]
      : [...acc, group]
  }, [])

const pairings = (collection, key) => collection[key]
  .filter(person => person.group > 0)
  .reduce((acc, person) => {
    const newPerson = {id: person.id, name: person.name}
    const index = acc.findIndex(group => group.id === person.group)
    if (index > -1) {
      const group = acc[index]
      const newGroup = {id: group.id, students: group.students || [], coaches: group.coaches || []}
      newGroup[key] = [...group[key], newPerson]
      return [...dropIndex(acc, index), newGroup]
    } else {
      const newGroup = {id: person.group, students: [], coaches: []}
      newGroup[key] = [newPerson]
      return [...acc, newGroup]
    }

  }, [])

const dropIndex = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)]
