import React from 'react'
import {useSelector} from 'react-redux'
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


export const AttendeeEditor = ({attendee}) => {
  const languages = useSelector(selectLanguages)
  const testId = name => `attendee-editor-${name}`

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
      value={attendee.name}
      onChange={() => {}}
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
          checked={attendee.attendance}
          onChange={() => {}}
        />
      }
    />

  const roleRadioButtons =
    <FormControl component='fieldset'>
      <FormLabel component='label'>Role</FormLabel>
      <RadioGroup
        row aria-label='role' name='role'
        value={attendee.role}
        onChange={() => {}}
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
