import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAttendee, goToPairingStep, selectAttendees, selectCoaches, selectStudents} from '../attendeesSlice'
import {featureEnabled} from '../../../../config/togglesSlice'
import {AttendeeCard} from './AttendeeCard'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import TextField from '@material-ui/core/TextField'
import './UpdateAttendeesStep.scss'

export const UpdateAttendeesStep = () => {
  const newScreenEnabled = useSelector(featureEnabled('updateAttendeesNewScreen'))
  const [selectedAttendee, setSelectedAttendee] = useState(undefined)
  const attendees = useSelector(selectAttendees)
  const [newStudent, setNewStudent] = useState('')
  const [newCoach, setNewCoach] = useState('')
  const students = useSelector(selectStudents)
  const coaches = useSelector(selectCoaches)
  const dispatch = useDispatch()

  const createNewCoach = () => {
    if (newCoach !== '') {
      dispatch(addAttendee({name: newCoach, role: 'Coach', languages: [], attendance: true}))
      setNewCoach('')
    }
  }

  const createNewStudent = () => {
    if (newStudent !== '') {
      dispatch(addAttendee({name: newStudent, role: 'Student', languages: [], attendance: true}))
      setNewStudent('')
    }
  }

  const addNewAttendee = () => dispatch(addAttendee({name: '', role: 'Student', languages: [], attendance: true}))
  const selectAttendeeToEdit = id => setSelectedAttendee(selectedAttendee !== id ? id : undefined)

  const newScreen =
        <>
          <div className='Attendees' data-test-id='attendees-list'>
            <div data-test-id='add-new-attendee-button' onClick={addNewAttendee}>
              <IconButton><PersonAddIcon/></IconButton>
            </div>
            {attendees.slice().reverse().map(attendee =>
              <div key={attendee.id}
                data-test-id='attendee-display-name'
                className={`AttendeeDisplayName ${selectedAttendee === attendee.id && 'SelectedToEdit'}`}
                onClick={() => selectAttendeeToEdit(attendee.id)}
              >
                {attendee.name}
              </div>
            )}
          </div>
          <div className='AttendeeEditor' data-test-id='attendee-edit-form'>

          </div>
        </>

  const currentScreen =
        <>
          <div className='Students'>
            <h3>Students</h3>
            <div className='AddNew'>
              <TextField className='AddNewName' label='Name' value={newStudent}
                onChange={e => setNewStudent(e.target.value)} fullWidth/>
              <Button variant='outlined' color='primary' onClick={createNewStudent}>New Student</Button>
            </div>
            {students.slice().reverse().map(attendee => <AttendeeCard data={attendee}/>)}
          </div>
          <div className='Coaches'>
            <h3>Coaches</h3>
            <div className='AddNew'>
              <TextField className='AddNewName' label='Name' value={newCoach}
                onChange={e => setNewCoach(e.target.value)} fullWidth/>
              <Button variant='outlined' color='primary' onClick={createNewCoach}>New Coach</Button>
            </div>
            {coaches.slice().reverse().map(attendee => <AttendeeCard data={attendee}/>)}
          </div>
        </>

  return (
    <div className='UpdateAttendeesStep'>
      <div className='UpdateAttendeesStepHeader'>
        <span>Step 2: Update attendance, skills and add new students or coaches</span>
        <Button className='UpdateAttendeesStepDone' variant='contained' color='primary'
          endIcon={<SkipNextIcon/>} onClick={() => dispatch(goToPairingStep())}>
                    Continue to pairings
        </Button>
      </div>
      <div className='UpdateAttendeesStepContent'>
        {newScreenEnabled ? newScreen : currentScreen}
      </div>
    </div>
  )
}
