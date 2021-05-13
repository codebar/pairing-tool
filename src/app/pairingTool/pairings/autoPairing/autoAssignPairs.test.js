import {testStore} from '../../../../test/testUtils'
import {storeInitialState} from '../../../../config/store'
import {autoAssignPairs} from './autoAssignPairs'
import {selectPairingGroups} from '../pairingsSlice'

describe('Auto assign pairs', () => {

  const runAutoPairingsFor = async availableParticipants => {
    const store = testStore({
      ...storeInitialState,
      pairings: availableParticipants
    })
    await store.dispatch(autoAssignPairs())
    return selectPairingGroups(store.getState())
  }

  const groupExists = (pairingGroups, studentId, coachId) => {
    return pairingGroups.some(group =>
      group.students.some(student => student.id === studentId)
        && group.coaches.some(coach => coach.id === coachId)
    )
  }

  it('does assign a pair if there is a match in language', async () => {
    const pairingGroups = await runAutoPairingsFor({
      students: [{id: 1, name: 'A', languages: ['JS'], group: 0}],
      coaches: [{id: 2, name: 'B', languages: ['JS'], group: 0}]
    })
    expect(groupExists(pairingGroups, 1, 2)).toBeTruthy()
  })

  it('does not assign a pair if there are no matches in languages', async () => {
    const pairingGroups = await runAutoPairingsFor({
      students: [{id: 1, name: 'A', languages: ['Python'], group: 0}],
      coaches: [{id: 2, name: 'B', languages: ['JS'], group: 0}]
    })
    expect(groupExists(pairingGroups, 1, 2)).toBeFalsy()
  })

  it('does assign different pairs for different matches', async () => {
    const pairingGroups = await runAutoPairingsFor({
      students: [
        {id: 10, name: 'A', languages: ['JS'], group: 0},
        {id: 11, name: 'B', languages: ['Python'], group: 0},
      ],
      coaches: [
        {id: 20, name: 'X', languages: ['JS'], group: 0},
        {id: 21, name: 'Y', languages: ['Python'], group: 0}
      ]
    })

    expect(groupExists(pairingGroups, 10, 20)).toBeTruthy()
    expect(groupExists(pairingGroups, 11, 21)).toBeTruthy()
  })

})
