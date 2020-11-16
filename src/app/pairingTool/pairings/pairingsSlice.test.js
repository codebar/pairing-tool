import {
  addPeopleForPairings,
  initialState,
  moveCoachToGroup,
  moveStudentToGroup,
  pairingsReducer,
  selectAvailableCoaches,
  selectAvailableStudents,
  selectPairingGroups
} from './pairingsSlice'

describe('The Pairings Slice', () => {

  describe('Adding people for pairings', () => {
    const action = addPeopleForPairings({
      students: [{id: 1, name: 'Roger Rabbit', languages: ['HTML'], attendance: true, role: 'Student', notes: '...'}],
      coaches: [{id: 3, name: 'Jessica Rabbit', languages: ['CSS'], attendance: true, role: 'Coach', notes: '...'}]
    })
    it('retain the id, name, and languages from each entry', () => {
      const nextState = pairingsReducer(initialState, action)

      const rootState = {pairings: nextState}
      expect(selectAvailableStudents(rootState)[0]).toMatchObject({id: 1, name: 'Roger Rabbit', languages: ['HTML']})
      expect(selectAvailableCoaches(rootState)[0]).toMatchObject({id: 3, name: 'Jessica Rabbit', languages: ['CSS']})
    })
    it('assigns people to the available group (0)', () => {
      const nextState = pairingsReducer(initialState, action)

      const rootState = {pairings: nextState}
      expect(selectAvailableStudents(rootState)[0]).toMatchObject({id: 1, group: 0})
      expect(selectAvailableCoaches(rootState)[0]).toMatchObject({id: 3, group: 0})
    })
    it('does not add duplicates (by id)', () => {
      const state = {
        ...initialState,
        students: [{id: 1, name: 'Whatever', languages: [], group: 0}],
        coaches: [{id: 3, name: 'Another', languages: [], group: 0}]
      }
      const nextState = pairingsReducer(state, action)

      const rootState = {pairings: nextState}
      const availableStudents = selectAvailableStudents(rootState)
      const availableCoaches = selectAvailableCoaches(rootState)
      expect(availableStudents.length).toBe(1)
      expect(availableStudents[0]).toMatchObject({name: 'Whatever'})
      expect(availableCoaches.length).toBe(1)
      expect(availableCoaches[0]).toMatchObject({name: 'Another'})
    })
  })

  describe('Moving a coach to a group', () => {
    const action = moveCoachToGroup({coachId: 1, groupId: 1})
    const coach = {id: 1, name: 'A', languages: [], group: 0}
    it('updates the group of the coach', () => {
      const state = {...initialState, coaches: [coach]}

      const nextState = pairingsReducer(state, action)

      expect(nextState.coaches).toContainEqual({...coach, group: 1})
    })
  })

  describe('Moving a student to a group', () => {
    const action = moveStudentToGroup({studentId: 1, groupId: 1})
    const student = {id: 1, name: 'A', languages: [], group: 0}
    it('updates the group of the student', () => {
      const state = {...initialState, students: [student]}

      const nextState = pairingsReducer(state, action)

      expect(nextState.students).toContainEqual({...student, group: 1})
    })
  })

  describe('Selecting available coaches', () => {
    it('returns the coaches who are in groups other than 0', () => {
      const state = {
        ...initialState,
        coaches: [
          {id: 1, name: 'A', languages: [], group: 0},
          {id: 2, name: 'B', languages: [], group: 1}
        ]
      }
      const rootState = {pairings: state}
      expect(selectAvailableCoaches(rootState)).toContainEqual({id: 1, name: 'A', languages: [], group: 0})
      expect(selectAvailableCoaches(rootState)).not.toContainEqual({id: 2, name: 'B', languages: [], group: 1})
    })
  })

  describe('Selecting available students', () => {
    it('returns the students who are in groups other than 0', () => {
      const state = {
        ...initialState,
        students: [
          {id: 1, name: 'A', languages: [], group: 0},
          {id: 2, name: 'B', languages: [], group: 1}
        ]
      }
      const rootState = {pairings: state}
      expect(selectAvailableStudents(rootState)).toContainEqual({id: 1, name: 'A', languages: [], group: 0})
      expect(selectAvailableStudents(rootState)).not.toContainEqual({id: 2, name: 'B', languages: [], group: 1})
    })
  })

  describe('Selecting pairing groups', () => {
    const rootState = pairings => ({pairings, configuration: {languages: ['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java', 'Other']}})

    it('excludes entries from group 0', () => {
      const state = {
        students: [{id: 1, name: 'A', languages: [], group: 0}],
        coaches: [{id: 10, name: 'X', languages: [], group: 0}]
      }
      const groups = selectPairingGroups(rootState(state))

      expect(groups.find(group => group.id === 0)).toBe(undefined)
    })
    it('collects group that only have students or coaches', () => {
      const state = {
        students: [{id: 1, name: 'A', languages: [], group: 1}],
        coaches: [{id: 10, name: 'X', languages: [], group: 2}]
      }
      const groups = selectPairingGroups(rootState(state))

      expect(groups).toContainEqual({id: 1, students: [{id: 1, name: 'A'}], coaches: [], languages: []})
      expect(groups).toContainEqual({id: 2, students: [], coaches: [{id: 10, name: 'X'}], languages: []})
    })
    it('collects multiple students/coaches in the same group', () => {
      const state = {
        students: [
          {id: 1, name: 'A', languages: [], group: 1},
          {id: 2, name: 'B', languages: [], group: 2},
          {id: 3, name: 'C', languages: [], group: 1},
          {id: 4, name: 'D', languages: [], group: 2},
          {id: 5, name: 'E', languages: [], group: 1},
        ],
        coaches: [
          {id: 11, name: 'V', languages: [], group: 2},
          {id: 12, name: 'W', languages: [], group: 2},
          {id: 13, name: 'X', languages: [], group: 1},
          {id: 14, name: 'Y', languages: [], group: 1},
          {id: 15, name: 'Z', languages: [], group: 1},
        ]
      }
      const groups = selectPairingGroups(rootState(state))

      expect(groups).toContainEqual({
        id: 1,
        students: [{id: 1, name: 'A'}, {id: 3, name: 'C'}, {id: 5, name: 'E'}],
        coaches: [{id: 13, name: 'X'}, {id: 14, name: 'Y'}, {id: 15, name: 'Z'}],
        languages: []
      })
      expect(groups).toContainEqual({
        id: 2,
        students: [{id: 2, name: 'B'}, {id: 4, name: 'D'}],
        coaches: [{id: 11, name: 'V'}, {id: 12, name: 'W'}],
        languages: []
      })
    })
    it('returns the group sorted by id in ascending order', () => {
      const state = {
        students: [
          {id: 1, name: 'A', languages: [], group: 0},
          {id: 2, name: 'B', languages: [], group: 2},
          {id: 3, name: 'C', languages: [], group: 3},
          {id: 4, name: 'D', languages: [], group: 0},
          {id: 5, name: 'E', languages: [], group: 1},
        ],
        coaches: [
          {id: 11, name: 'V', languages: [], group: 2},
          {id: 12, name: 'W', languages: [], group: 0},
          {id: 13, name: 'X', languages: [], group: 0},
          {id: 14, name: 'Y', languages: [], group: 3},
          {id: 15, name: 'Z', languages: [], group: 1},
        ]
      }
      const groups = selectPairingGroups(rootState(state))
      const groupIds = groups.map(x => x.id)
      expect(groupIds[0] < groupIds[1]).toBeTruthy()
      expect(groupIds[1] < groupIds[2]).toBeTruthy()
    })
    it('always add an empty group with the next available ID', () => {
      const state = {
        students: [
          {id: 1, name: 'A', languages: [], group: 0},
          {id: 2, name: 'B', languages: [], group: 2},
          {id: 3, name: 'C', languages: [], group: 1}
        ],
        coaches: [
          {id: 11, name: 'X', languages: [], group: 0},
          {id: 12, name: 'Y', languages: [], group: 3},
          {id: 13, name: 'Z', languages: [], group: 1}
        ]
      }
      const groups = selectPairingGroups(rootState(state))

      expect(groups).toContainEqual({id: 4, students: [], coaches: [], languages: []})
    })
    it('shows the languages in common that the coaches and students share', () => {
      const state = {
        students: [{id: 1, name: 'A', languages: ['HTML', 'CSS', 'JS', 'Python'], group: 1}],
        coaches: [{id: 10, name: 'X', languages: ['JS', 'Python', 'Java', 'SQL'], group: 1}]
      }
      const groups = selectPairingGroups(rootState(state))

      expect(groups).toContainEqual({
        id: 1,
        students: [{id: 1, name: 'A'}],
        coaches: [{id: 10, name: 'X'}],
        languages: ['JS', 'Python']
      })
    })
  })
})
