import {selectLanguageNames} from '../../../configuration/configurationSlice'
import {
  moveCoachToGroup,
  moveStudentToGroup, selectAvailableCoaches, selectAvailableStudents,
  selectNextGroupId
} from '../pairingsSlice'

export const autoAssignPairs = () => (dispatch, getState) => {
  const state = getState()
  const languages = selectLanguageNames(state)

  languages.forEach(language => {
    const nextGroupId = selectNextGroupId(getState())
    const students = selectAvailableStudents(getState())
    const coaches = selectAvailableCoaches(getState())

    const matchingStudents = students.filter(student => student.languages.includes(language))
    const matchingCoaches = coaches.filter(coach => coach.languages.includes(language))
    if (matchingStudents.length === 1 && matchingCoaches.length === 1) {
      dispatch(moveStudentToGroup({studentId: matchingStudents[0].id, groupId: nextGroupId}))
      dispatch(moveCoachToGroup({coachId: matchingCoaches[0].id, groupId: nextGroupId}))
    }
  })
}
