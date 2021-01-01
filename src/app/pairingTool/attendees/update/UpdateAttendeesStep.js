import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAttendee, goToPairingStep, selectAttendees, selectCoaches, selectStudents} from '../attendeesSlice'
import {featureEnabled} from '../../../../config/togglesSlice'
import {AttendeeCard} from './AttendeeCard'
import {AttendeeEditor} from './editor/AttendeeEditor'
import {Button, Icon, IconButton, TextField} from '@material-ui/core'
import {PersonAdd as PersonAddIcon, SkipNext as SkipNextIcon} from '@material-ui/icons'
import newbie from './newbie.png'
import './UpdateAttendeesStep.scss'

export const UpdateAttendeesStep = () => {
  const newScreenEnabled = useSelector(featureEnabled('updateAttendeesNewScreen'))
  return newScreenEnabled ?  <NewScreen/> : <CurrentScreen />
}

const NewScreen = () => {
  const [selectedAttendee, setSelectedAttendee] = useState(undefined)
  const attendees = useSelector(selectAttendees)
  const dispatch = useDispatch()
  const testId = name => `update-attendees-step-${name}`

  const selectAttendeeToEdit = attendee => {
    if (selectedAttendee === undefined || selectedAttendee.id !== attendee.id)
      setSelectedAttendee(attendee)
    else
      setSelectedAttendee(undefined)
  }

  const addNewAttendeeButton =
    <div
      data-test-id={testId('new-attendee')}
      onClick={() => dispatch(addAttendee({name: '', role: 'Student', languages: [], attendance: true}))}
    >
      <IconButton><PersonAddIcon/></IconButton>
    </div>

  const attendeesCards =
    <>
      {attendees.slice().reverse().map(attendee =>
        <AttendeeMiniCard
          key={attendee.id}
          attendee={attendee}
          selected={selectedAttendee !== undefined && selectedAttendee.id === attendee.id}
          onClick={() => selectAttendeeToEdit(attendee)}
        />
      )}
    </>

  return (
    <div className='UpdateAttendeesStep'>
      <div className='UpdateAttendeesStepHeader'>
        <span>Step 2: Update attendance, skills and add new students or coaches</span>
        <Button
          data-test-id={testId('pairing')}
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
        <div className='Attendees' data-test-id={testId('list')}>
          {addNewAttendeeButton}
          {attendeesCards}
        </div>
        {selectedAttendee !== undefined && <AttendeeEditor attendee={selectedAttendee}/>}
      </div>
    </div>
  )
}

const AttendeeMiniCard = ({attendee, selected, onClick}) => {
  const subclass = selected
    ? 'SelectedToEdit'
    : (attendee.attendance
      ? 'IsAttending'
      : 'IsNotAttending'
    )

  const icon = attendee.role === 'Student'
    ? 'fas fa-book-reader'
    : 'fas fa-graduation-cap'

  return (
    <div
      data-test-id='attendee-display-name'
      className={`AttendeeDisplayName ${subclass}`}
      onClick={onClick}
    >
      <img className={`FirstTimerIcon ${attendee.new === false ? 'Hidden' : ''}`} src={newbie} alt='First Timer'/>
      <Icon className={`RoleIcon ${icon}`} />
      <span className='AttendeeNameLabel'>{attendee.name}</span>
    </div>
  )
}

const CurrentScreen = () => {
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
        <Button className='UpdateAttendeesStepDone' variant='contained' color='primary' endIcon={<SkipNextIcon/>} onClick={() => dispatch(goToPairingStep())}>
          Continue to pairings
        </Button>
      </div>
      <div className='UpdateAttendeesStepContent'>
        <div className='Students'>
          <h3>Students</h3>
          <div className='AddNew'>
            <TextField className='AddNewName' label='Name' value={newStudent} onChange={e => setNewStudent(e.target.value)} fullWidth/>
            <Button variant='outlined' color='primary' onClick={createNewStudent}>New Student</Button>
          </div>
          {students.slice().reverse().map(attendee => <AttendeeCard key={attendee.id} data={attendee}/>)}
        </div>
        <div className='Coaches'>
          <h3>Coaches</h3>
          <div className='AddNew'>
            <TextField className='AddNewName' label='Name' value={newCoach} onChange={e => setNewCoach(e.target.value)} fullWidth/>
            <Button variant='outlined' color='primary' onClick={createNewCoach}>New Coach</Button>
          </div>
          {coaches.slice().reverse().map(attendee => <AttendeeCard key={attendee.id} data={attendee}/>)}
        </div>
      </div>
    </div>
  )
}
