import {createSlice} from '@reduxjs/toolkit'
import deepEqual from 'deep-equal'
import pairingCsvParser from './csv/pairingCsvParser'
import {selectLanguageDetectionRules} from '../../configuration/configurationSlice'
import {addPeopleForPairings} from '../pairings/pairingsSlice'

export const initialState = {
  list: [],
  nextId: 1,
  readyForPairing: false
}

const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {
    addAttendee: (state, action) => {
      const attendeeExists = ({id, attendance, ...fields}) => deepEqual(fields, action.payload)
      if (!state.list.some(attendeeExists)) {
        state.list.push({
          id: state.nextId,
          attendance: false,
          ...action.payload
        })
        state.nextId += 1
      }
    },
    updateAttendeeName: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      state.list[index] = {...attendee, name: action.payload.name}
    },
    updateAttendeeNotes: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      state.list[index] = {...attendee, notes: action.payload.notes}
    },
    updateAttendeeSkills: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      state.list[index] = {...attendee, skills: action.payload.skills}
    },
    updateAttendeeTutorial: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      state.list[index] = {...attendee, tutorial: action.payload.tutorial}
    },
    toggleAttendance: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload)
      const attendee = state.list[index]
      state.list[index] = {...attendee, attendance: !attendee.attendance}
    },
    toggleRole: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload)
      const attendee = state.list[index]
      const role = attendee.role === 'Student' ? 'Coach' : 'Student'
      state.list[index] = {...attendee, role}
    },
    toggleLanguage: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      const updatedLanguages = attendee.languages.includes(action.payload.language)
        ? attendee.languages.filter(lang => lang !== action.payload.language)
        : attendee.languages.concat(action.payload.language)
      state.list[index] = {...attendee, languages: updatedLanguages}
    },
    readyForPairing: state => {
      state.readyForPairing = true
    },
    reviewAttendeesAgain: state => {
      state.readyForPairing = false
    }
  }
})

export const attendeesReducer = attendeesSlice.reducer
export const {
  addAttendee,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial,
  toggleAttendance,
  toggleRole,
  toggleLanguage,
  readyForPairing,
  reviewAttendeesAgain
} = attendeesSlice.actions

// SELECTORS
export const selectAttendees = state => state.attendees.list
export const selectAttendeeById = id => state => state.attendees.list.filter(x => x.id === id)[0]
export const selectStudents = state => state.attendees.list.filter(x => x.role === 'Student')
export const selectCoaches = state => state.attendees.list.filter(x => x.role === 'Coach')
export const selectPresentStudents = state => selectStudents(state).filter(x => x.attendance === true)
export const selectPresentCoaches = state => selectCoaches(state).filter(x => x.attendance === true)
export const selectReadyForAttendanceReview = state => state.attendees.list.length > 0
export const selectReadyForPairing = state => state.attendees.readyForPairing

// THUNKS
export const parseAttendeeList = file => async (dispatch, getState) => {
  try {
    const csv = await file.text()
    const languages = selectLanguageDetectionRules(getState())
    pairingCsvParser.parse(csv, languages).forEach(attendee => dispatch(addAttendee(attendee)))
  } catch (e) {
    console.error(e)
  }
}
export const goToPairingStep = () => (dispatch, getState) => {
  const state = getState()
  dispatch(readyForPairing())
  dispatch(addPeopleForPairings({
    students: selectPresentStudents(state),
    coaches: selectPresentCoaches(state)
  }))
}
