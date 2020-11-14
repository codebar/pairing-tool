import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAttendee, attendeesInitializedSelector, coachesSelector, studentsSelector} from './attendeesSlice'
import {CsvFileDropzone} from './csv/CsvFileDropzone'
import {AttendeesList} from './cards/AttendeeList'
import DoneIcon from '@material-ui/icons/Done'
import Button from '@material-ui/core/Button'
import pairingCsvImg from './pairingCsvImg.png'
import './Attendees.scss'
import TextField from '@material-ui/core/TextField'

export const Attendees = () => {
  const initialized = useSelector(attendeesInitializedSelector)
  return (
    <div className='Attendees'>
      {!initialized ? <FirstStep/> : <SecondStep/>}
    </div>
  )
}

const FirstStep = () => {
  return (
    <div className='FirstStep'>
      <h1>Pairing Tool</h1>
      <span>Step 1: Download the pairing CSV from the workshop page</span>
      <img src={pairingCsvImg} alt='Pairing CSV Image' />
      <span>Step 2: Process the CSV file here</span>
      <CsvFileDropzone/>
    </div>
  )
}

const SecondStep = () => {
  const [newStudent, setNewStudent] = useState('')
  const [newCoach, setNewCoach] = useState('')
  const students = useSelector(studentsSelector)
  const coaches = useSelector(coachesSelector)
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
    <div className='SecondStep'>
      <div className='SecondStepHeader'>
        <span>Step 3: Update attendance, skills and add new students or coaches</span>
        <Button
          className='SecondStepDone'
          variant='contained'
          endIcon={<DoneIcon/>}
          // onClick={() => dispatch(closeAttendeeList())}
        >
          Continue to pairings
        </Button>
      </div>
      <div className='SecondStepContent'>
        <div className='Students'>
          <h3>Students</h3>
          <div>
            <TextField label='Name' value={newStudent} onChange={e => setNewStudent(e.target.value)}/>
            <Button variant='outlined' color='primary' onClick={createNewStudent}>New Student</Button>
          </div>
          <AttendeesList data={students} />
        </div>
        <div className='Coaches'>
          <h3>Coaches</h3>
          <div>
            <TextField label='Name' value={newCoach} onChange={e => setNewCoach(e.target.value)}/>
            <Button variant='outlined' color='primary' onClick={createNewCoach}>New Coach</Button>
          </div>
          <AttendeesList data={coaches} />
        </div>
      </div>
    </div>
  )
}
