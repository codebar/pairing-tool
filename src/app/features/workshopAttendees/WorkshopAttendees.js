import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import './WorkshopAttendees.scss'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import {AccountCircle, Create} from '@material-ui/icons'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Rating from '@material-ui/lab/Rating'

export const WorkshopAttendees = () => (
  <div className='WorkshopAttendees'>
    <div className='Actions'>
      <AddParticipantModal role={'student'}/>
      <AddParticipantModal role={'coach'}/>
      <Button variant='contained' color='primary'>Parse CSV</Button>
    </div>
    <div className='Students'>
      <h3>Students</h3>
    </div>
    <div className='Coaches'>
      <h3>Coaches</h3>
    </div>
  </div>
)



const AddParticipantModal = ({role}) => {
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div>
      <Button variant='contained' color='primary' onClick={openModal}>{`Add ${role}`}</Button>
      <Dialog open={open} onClose={closeModal} aria-labelledby={`add-${role}-form-dialog-title`}>
        <DialogTitle id={`add-${role}-form-dialog-title`}>{`Add new ${role}`}</DialogTitle>
        <DialogContent className='omg'>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item xs={1}><AccountCircle /></Grid>
            <Grid item xs={10}><TextField id='input-with-icon-grid' label='Name (pronouns)' fullWidth/></Grid>
          </Grid>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item xs={1}><Create /></Grid>
            <Grid item xs={10}><TextField id='input-with-icon-grid' label='Skills' multiline rowsMax={3} fullWidth/></Grid>
          </Grid>
          <Skill name='HTML'/>
          <Skill name='CSS'/>
          <Skill name='Javascript'/>
          <Skill name='Python'/>
          <Skill name='SQL'/>
          <Skill name='Java'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color='secondary'>CANCEL</Button>
          <Button onClick={closeModal} color='primary'>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const Skill = ({name}) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState(0)

  return (<Grid container spacing={1} alignItems='flex-end'>
    <Grid item xs={3}/>
    <Grid item xs={3}>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={event => {
            setChecked(event.target.checked)
            setValue(0)
          }} name={name} color='primary'/>
        }
        label={name}
      />
    </Grid>
    <Grid item xs={3}>
      <Rating
        className={'Rating'}
        name={`${name}-rating`}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        disabled={!checked}
      />
    </Grid>
  </Grid>)
}
