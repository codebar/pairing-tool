import {
  moveCoachToGroup,
  moveStudentToGroup,
  selectNextGroupId
} from '../pairingsSlice'

export const autoAssignPairs = () => (dispatch, getState) => {
  const state = getState()
  const nextGroupId = selectNextGroupId(state)

  dispatch(moveStudentToGroup({studentId: 1, groupId: nextGroupId}))
  dispatch(moveCoachToGroup({coachId: 2, groupId: nextGroupId}))
}
