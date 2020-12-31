import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectLanguages} from '../../../../configuration/configurationSlice'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Switch
} from '@material-ui/core'
import firstTimer from '../firstTimer.jpg'
import './AttendeeEditor.scss'
import {toggleAttendance, toggleRole, updateAttendeeName} from '../../attendeesSlice'


export const AttendeeEditor = ({attendee}) => {
  const languages = useSelector(selectLanguages)
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState(false)
  const [role, setRole] = useState('')
  const dispatch = useDispatch()
  const testId = name => `attendee-editor-${name}`

  useEffect(() => {
    setName(attendee.name)
    setAttendance(attendee.attendance)
    setRole(attendee.role)
  }, [attendee])

  const firstTimerIcon =
    <>
      {attendee.new &&
      <img
        data-test-id={testId('new')}
        className='FirstTimerIcon'
        src={firstTimer}
        alt='First Timer'
      />}
    </>

  const nameInput =
    <TextField
      data-test-id={testId('name')}
      label='Name'
      value={name}
      onChange={e => setName(e.target.value)}
      onBlur={() => dispatch(updateAttendeeName({id: attendee.id, name}))}
    />

  const attendanceSwitch =
    <FormControlLabel
      label='Attendance'
      labelPlacement='start'
      control={
        <Switch
          data-test-id={testId('attendance')}
          name='attendance'
          color='primary'
          checked={attendance}
          onChange={() => {
            setAttendance(!attendance)
            dispatch(toggleAttendance(attendee.id))
          }}
        />
      }
    />

  const roleRadioButtons =
    <FormControl component='fieldset'>
      <FormLabel component='label'>Role</FormLabel>
      <RadioGroup
        row aria-label='role' name='role'
        value={role}
        onChange={e => {
          setRole(e.target.value)
          dispatch(toggleRole(attendee.id))
        }}
      >
        <FormControlLabel
          label='Student'
          value='Student'
          control={<Radio data-test-id={testId('role-student')}/>}
        />
        <FormControlLabel
          label='Coach'
          value='Coach'
          control={<Radio data-test-id={testId('role-coach')}/>}
        />
      </RadioGroup>
    </FormControl>

  const notesTextarea =
    <TextField
      data-test-id={testId('notes')}
      label='Notes'
      multiline
      rowsMax={2}
      value={attendee.notes}
      onChange={() => {}}
    />

  const skillsTextarea =
    <TextField
      data-test-id={testId('skills')}
      label='Skills'
      multiline
      rowsMax={2}
      value={attendee.role === 'Coach' ? attendee.skills : ''}
      onChange={() => {}}
      InputProps={{readOnly: true}}
    />

  const tutorialInput =
    <TextField
      data-test-id={testId('tutorial')}
      label='Tutorial'
      value={attendee.role === 'Student' ? attendee.tutorial : ''}
      onChange={() => {}}
      InputProps={{readOnly: true}}
    />

  const languageButtons =
    <div className='LanguageButtons'>
      {languages.map(language =>
        <Button
          data-test-id={testId(`language-${language}`)}
          key={language}
          className={`${language}Button ${attendee.languages.includes(language) ? 'Active' : 'Inactive'}`}
          variant='contained'
          color='primary'
          onClick={() => {}}
        >
          {language}
        </Button>
      )}
    </div>

  return (
    <div className='AttendeeEditor' data-test-id='attendee-editor'>
      {firstTimerIcon}
      {nameInput}
      {attendanceSwitch}
      {roleRadioButtons}
      {notesTextarea}
      {skillsTextarea}
      {tutorialInput}
      {languageButtons}
    </div>
  )
}
