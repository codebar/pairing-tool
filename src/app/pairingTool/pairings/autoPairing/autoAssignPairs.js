import {selectLanguageNames} from '../../../configuration/configurationSlice'
import {
  moveCoachToGroup,
  moveStudentToGroup,
  selectAvailableCoaches,
  selectAvailableStudents,
  selectNextGroupId
} from '../pairingsSlice'

export const autoAssignPairs = () => (dispatch, getState) => {
  let createdPair = false
  do {
    createdPair = false
    selectLanguageNames(getState()).forEach(language => {
      const nextGroupId = selectNextGroupId(getState())
      const matchingStudents = selectAvailableStudents(getState()).filter(student => student.languages.includes(language))
      const matchingCoaches = selectAvailableCoaches(getState()).filter(coach => coach.languages.includes(language))
      if (matchingCoaches.length === 1 && matchingStudents.length === 1) {
        dispatch(moveStudentToGroup({studentId: matchingStudents[0].id, groupId: nextGroupId}))
        dispatch(moveCoachToGroup({coachId: matchingCoaches[0].id, groupId: nextGroupId}))
        createdPair = true
      }
    })
  } while(createdPair)
}
