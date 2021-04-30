import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectLanguages} from '../../../../configuration/configurationSlice'
import {
  toggleAttendance,
  toggleLanguage,
  toggleRole,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial
} from '../../attendeesSlice'
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Switch
} from '@material-ui/core'
import './AttendeeEditor.scss'


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
    setSkills(attendee.skills !== undefined ? attendee.skills : '')
    setTutorial(attendee.tutorial !== undefined ? attendee.tutorial : '')
    setLanguages(attendee.languages)
  }, [
    attendee.name,
    attendee.attendance,
    attendee.role,
    attendee.notes,
    attendee.skills,
    attendee.tutorial,
    attendee.languages
  ])

  const nameInput =
    <TextField
      data-test-id={testId('name')}
      className='NameInput'
      label='Name'
      value={name}
      onChange={e => setName(e.target.value)}
      onBlur={() => dispatch(updateAttendeeName({id: attendee.id, name}))}
    />

  const attendanceSwitch =
    <FormControlLabel
      label='Attendance'
      labelPlacement='top'
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
      <RadioGroup
        aria-label='role'
        name='role'
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
      fullWidth
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
      fullWidth
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
      fullWidth
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
      <div className='Row'>
        {nameInput}
        {attendanceSwitch}
        {roleRadioButtons}
      </div>
      <div className='Row'>
        {notesTextarea}
      </div>
      <div className='Row'>
        {skillsTextarea}
      </div>
      <div className='Row'>
        {tutorialInput}
      </div>
      <div className='Row'>
        {languageButtons}
      </div>
      <div className='ComingSoon'>
        <p><em>Here we can add more configuration options in the future</em></p>
        <p><em>Useful when we want to persist this information and/or auto-calculate pairs</em></p>
      </div>

    </div>
  )
}
