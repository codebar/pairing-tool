import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  addAttendee,
  selectStudents,
  selectCoaches,
  selectReadyForAttendanceReview,
  selectReadyForPairing,
  reviewAttendeesAgain,
  goToPairingStep
} from './attendeesSlice'
import {CsvFileDropzone} from './csv/CsvFileDropzone'
import {AttendeesList} from './cards/AttendeeList'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import Button from '@material-ui/core/Button'
import pairingCsvImg from './pairingCsvImg.png'
import './Attendees.scss'
import TextField from '@material-ui/core/TextField'
import {selectAvailableCoaches, selectAvailableStudents, selectPairingGroups} from '../pairings/pairingsSlice'

export const Attendees = () => {
  const initialized = useSelector(selectReadyForAttendanceReview)
  const readyForPairing = useSelector(selectReadyForPairing)
  return (
    <div className='Attendees'>
      {readyForPairing && <ThirdStep/>}
      {!readyForPairing && initialized && <SecondStep/>}
      {!readyForPairing && !initialized && <FirstStep/>}
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
    <div className='SecondStep'>
      <div className='SecondStepHeader'>
        <span>Step 3: Update attendance, skills and add new students or coaches</span>
        <Button
          className='SecondStepDone'
          variant='contained'
          color='primary'
          endIcon={<SkipNextIcon/>}
          onClick={() => dispatch(goToPairingStep())}
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

const ThirdStep = () => {
  const availableStudents = useSelector(selectAvailableStudents)
  const availableCoaches = useSelector(selectAvailableCoaches)
  const groups = useSelector(selectPairingGroups)
  const dispatch = useDispatch()

  return (
    <div className='ThirdStep'>
      <div className='ThirdStepHeader'>
        <span>Step 4: Let the pairings begin!!!</span>
        <Button
          className='ThirdStepBack'
          variant='contained'
          color='primary'
          startIcon={<SkipPreviousIcon/>}
          onClick={() => dispatch(reviewAttendeesAgain())}
        >
          Review attendance and skills
        </Button>
      </div>
      <div className='ThirdStepContent'>
        <div className='Attendees'>
          <h4>Students</h4>
          {availableStudents.map(student => <div className='AvailableStudent'>{student.name}</div>)}
          <h4>Coaches</h4>
          {availableCoaches.map(coach => <div className='AvailableCoach'>{coach.name}</div>)}
        </div>
        <div className='Pairs'>
          <h4>Pairs</h4>
          {groups.map(group =>
            <div className='PairingGroup'>
              {group.id}
              <div className='StudentsDrop'>&nbsp;</div>
              <div className='CoachesDrop'>&nbsp;</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
