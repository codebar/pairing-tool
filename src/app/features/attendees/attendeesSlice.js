import {createSlice} from '@reduxjs/toolkit'
import deepEqual from 'deep-equal'
import pairingCsvParser from './csv/pairingCsvParser'
import {languagesSelector} from '../configuration/configurationSlice'

export const initialState = {
  list: [],
  nextId: 1,
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
    toggleAttendance: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload)
      const attendee = state.list[index]
      state.list[index] = {...attendee, attendance: !attendee.attendance}
    },
    toggleLanguage: (state, action) => {
      const index = state.list.findIndex(attendee => attendee.id === action.payload.id)
      const attendee = state.list[index]
      const updatedLanguages = attendee.languages.includes(action.payload.language)
        ? attendee.languages.filter(lang => lang !== action.payload.language)
        : attendee.languages.concat(action.payload.language)
      state.list[index] = {...attendee, languages: updatedLanguages }
    }
  }
})
export const attendeesReducer = attendeesSlice.reducer
export const {addAttendee, toggleAttendance, toggleLanguage} = attendeesSlice.actions

// SELECTORS
export const studentsSelector = state => state.attendees.list.filter(x => x.role === 'Student')
export const coachesSelector = state => state.attendees.list.filter(x => x.role === 'Coach')
export const attendeesInitializedSelector = state => state.attendees.list.length > 0

// THUNKS
export const parseAttendeeList = file => async (dispatch, getState) => {
  try {
    const csv = await file.text()
    const languages = languagesSelector(getState())
    pairingCsvParser.parse(csv, languages).forEach(attendee => dispatch(addAttendee(attendee)))
  } catch (e) {
    console.error(e)
  }
}
