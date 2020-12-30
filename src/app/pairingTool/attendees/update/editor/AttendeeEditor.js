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
    <TextField label='Name' value={attendee.name} onChange={() => {}} data-test-id='attendee-edit-name-input'/>

  const attendeeRoleRadioButtons =
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Role</FormLabel>
      <RadioGroup row aria-label='role' name='role' value={attendee.role} onChange={() => {}}>
        <FormControlLabel value='Student' control={<Radio data-test-id={'attendee-edit-role-student'}/>} label='Student'/>
        <FormControlLabel value='Coach' control={<Radio data-test-id={'attendee-edit-role-coach'}/>} label='Coach'/>
      </RadioGroup>
    </FormControl>

  return (
    <div className='AttendeeEditor' data-test-id='attendee-edit-form'>
      {attendeeNameInput}
      {attendeeRoleRadioButtons}
    </div>
  )
}
