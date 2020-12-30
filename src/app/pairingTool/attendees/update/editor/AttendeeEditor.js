import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import './AttendeeEditor.scss'


export const AttendeeEditor = ({attendee}) => {

  const attendeeNameInput =
    <TextField
      data-test-id='attendee-edit-name-input'
      label='Name'
      value={attendee.name}
      onChange={() => {}}
    />

  const attendeeRoleRadioButtons =
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
          control={<Radio data-test-id={'attendee-edit-role-student'}/>}
        />
        <FormControlLabel
          label='Coach'
          value='Coach'
          control={<Radio data-test-id={'attendee-edit-role-coach'}/>}
        />
      </RadioGroup>
    </FormControl>

  const attendeeNotesInput =
    <TextField
      data-test-id='attendee-edit-notes-input'
      label='Notes'
      value={attendee.notes}
      onChange={() => {}}
    />

  const skillsInput =
    <TextField
      data-test-id='attendee-edit-skills-input'
      label='Skills'
      multiline
      rowsMax={2}
      value={attendee.skills}
      onChange={() => {}}
      disabled={attendee.role === 'Student'}
    />

  const tutorialInput =
    <TextField
      data-test-id='attendee-edit-tutorial-input'
      label='Tutorial'
      multiline
      rowsMax={2}
      value={attendee.tutorial}
      onChange={() => {}}
      disabled={attendee.role === 'Coach'}
    />

  return (
    <div className='AttendeeEditor' data-test-id='attendee-edit-form'>
      {attendeeNameInput}
      {attendeeRoleRadioButtons}
      {attendeeNotesInput}
      {skillsInput}
      {tutorialInput}
    </div>
  )
}
