import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAttendee, goToPairingStep, selectCoaches, selectStudents} from '../attendeesSlice'
import {AttendeeCard} from './AttendeeCard'
import Button from '@material-ui/core/Button'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import TextField from '@material-ui/core/TextField'
import './UpdateAttendeesStep.scss'

export const UpdateAttendeesStep = () => {
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

  return (
    <div className='UpdateAttendeesStep'>
      <div className='UpdateAttendeesStepHeader'>
        <span>Step 2: Update attendance, skills and add new students or coaches</span>
        <Button
          className='UpdateAttendeesStepDone'
          variant='contained'
          color='primary'
          endIcon={<SkipNextIcon/>}
          onClick={() => dispatch(goToPairingStep())}
        >
          Continue to pairings
        </Button>
      </div>
      <div className='UpdateAttendeesStepContent'>
        <div className='Students'>
          <h3>Students</h3>
          <div>
            <TextField label='Name' value={newStudent} onChange={e => setNewStudent(e.target.value)}/>
            <Button variant='outlined' color='primary' onClick={createNewStudent}>New Student</Button>
          </div>
          {students.slice().reverse().map(attendee => <AttendeeCard data={attendee}/>)}
        </div>
        <div className='Coaches'>
          <h3>Coaches</h3>
          <div>
            <TextField label='Name' value={newCoach} onChange={e => setNewCoach(e.target.value)}/>
            <Button variant='outlined' color='primary' onClick={createNewCoach}>New Coach</Button>
          </div>
          {coaches.slice().reverse().map(attendee => <AttendeeCard data={attendee}/>)}
        </div>
      </div>
    </div>
  )
}
