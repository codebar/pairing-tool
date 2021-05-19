import {
  moveCoachToGroup,
  moveStudentToGroup,
  selectAvailableCoaches,
  selectAvailableStudents,
  selectNextGroupId
} from '../pairingsSlice'
import {hopcroftKarp} from 'hopcroft-karp'

export const autoAssignPairs = () => (dispatch, getState) => {
  const graph = buildBipartiteGraph(
    selectAvailableStudents(getState()),
    selectAvailableCoaches(getState())
  )
  const solvedPairs = hopcroftKarp(graph)
  Object.entries(solvedPairs)
    .filter(([student, coach]) => coach !== null)
    .forEach(([student, coach]) => createPair(
      dispatch,
      parseInt(student),
      parseInt(coach),
      selectNextGroupId(getState())
    ))
}

const createPair = (dispatch, studentId, coachId, groupId) => {
  dispatch(moveStudentToGroup({studentId, groupId}))
  dispatch(moveCoachToGroup({coachId, groupId}))
}

const buildBipartiteGraph = (students, coaches) => {
  const graph = {}
  students.forEach(student => graph[student.id] = eligibleCoachesForStudent(student, coaches))
  return graph
}

const eligibleCoachesForStudent = (student, coaches) => {
  const studentLanguages = new Set(student.languages)
  return coaches
    .filter(coach => [...new Set(coach.languages)].filter( x => studentLanguages.has(x)).length > 0 )
    .map(coach => coach.id)
}
