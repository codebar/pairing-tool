import {storeInitialState} from '../../../../config/store'
import {autoAssignPairs} from './autoAssignPairs'
import {moveCoachToGroup, moveStudentToGroup} from '../pairingsSlice'

describe('Auto assign pairs thunk', () => {

  it('does magic', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      ...storeInitialState,
      pairings: {
        students: [{id: 1, name: 'A', languages: ['JS'], group: 0}],
        coaches: [{id: 2, name: 'B', languages: ['JS'], group: 0}]
      }
    })

    await autoAssignPairs()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(moveStudentToGroup({studentId: 1, groupId: 1}))
    expect(dispatch).toHaveBeenCalledWith(moveCoachToGroup({coachId: 2, groupId: 1}))
  })

})
