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
import {
  toggleAttendance,
  toggleLanguage,
  toggleRole,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial
} from '../../attendeesSlice'


export const AttendeeEditor = ({attendee}) => {
  const globalLanguages = useSelector(selectLanguages)
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState(false)
  const [role, setRole] = useState('')
  const [notes, setNotes] = useState('')
  const [skills, setSkills] = useState('')
  const [tutorial, setTutorial] = useState('')
  const [languages, setLanguages] = useState([])
  const dispatch = useDispatch()
  const testId = name => `attendee-editor-${name}`

  useEffect(() => {
    setName(attendee.name)
    setAttendance(attendee.attendance)
    setRole(attendee.role)
    setNotes(attendee.notes)
    if (attendee.skills !== undefined) setSkills(attendee.skills)
    if (attendee.tutorial !== undefined) setTutorial(attendee.tutorial)
    setLanguages(attendee.languages)
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
      value={notes}
      onChange={e => setNotes(e.target.value)}
      onBlur={() => dispatch(updateAttendeeNotes({id: attendee.id, notes}))}
    />

  const skillsTextarea =
    <TextField
      data-test-id={testId('skills')}
      label='Skills'
      multiline
      rowsMax={2}
      value={skills}
      onChange={e => setSkills(e.target.value)}
      onBlur={() => dispatch(updateAttendeeSkills({id: attendee.id, skills}))}
    />

  const tutorialInput =
    <TextField
      data-test-id={testId('tutorial')}
      label='Tutorial'
      value={tutorial}
      onChange={e => setTutorial(e.target.value)}
      onBlur={() => dispatch(updateAttendeeTutorial({id: attendee.id, tutorial}))}
    />

  const languageButtons =
    <div className='LanguageButtons'>
      {globalLanguages.map(language =>
        <Button
          data-test-id={testId(`language-${language}`)}
          key={language}
          className={`${language}Button ${languages.includes(language) ? 'Active' : 'Inactive'}`}
          variant='contained'
          color='primary'
          onClick={() => {
            if (!languages.includes(language))
              setLanguages([...languages, language])
            else {
              const index = languages.indexOf(language)
              setLanguages([
                ...languages.slice(0, index),
                ...languages.slice(index + 1)
              ])
            }


            dispatch(toggleLanguage({id: attendee.id, language}))
          }}
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
