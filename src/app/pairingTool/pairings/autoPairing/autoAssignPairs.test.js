import {storeInitialState} from '../../../../config/store'
import {autoAssignPairs} from './autoAssignPairs'
import {moveCoachToGroup, moveStudentToGroup} from '../pairingsSlice'

describe('Auto assign pairs thunk', () => {

  it('does assign a pair if there is a match in language', async () => {
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

  it('does not assign a pair if there are no matches in languages', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      ...storeInitialState,
      pairings: {
        students: [{id: 1, name: 'A', languages: ['Python'], group: 0}],
        coaches: [{id: 2, name: 'B', languages: ['JS'], group: 0}]
      }
    })

    await autoAssignPairs()(dispatch, getState)

    expect(dispatch).not.toHaveBeenCalled()
  })

  // it('does assign different pairs for different matches', async () => {
  //   const dispatch = jest.fn()
  //   const getState = () => ({
  //     ...storeInitialState,
  //     pairings: {
  //       students: [
  //         {id: 10, name: 'A', languages: ['JS'], group: 0},
  //         {id: 11, name: 'B', languages: ['Python'], group: 0},
  //       ],
  //       coaches: [
  //         {id: 20, name: 'X', languages: ['JS'], group: 0},
  //         {id: 21, name: 'Y', languages: ['Python'], group: 0}
  //       ]
  //     }
  //   })
  //
  //   await autoAssignPairs()(dispatch, getState)
  //
  //   expect(dispatch).toBeCalledWith(
  //     moveStudentToGroup({studentId: 10, groupId: 1}),
  //     moveCoachToGroup({coachId: 20, groupId: 1}),
  //     moveStudentToGroup({studentId: 11, groupId: 2}),
  //     moveCoachToGroup({coachId: 21, groupId: 2})
  //   )
  // })

})
