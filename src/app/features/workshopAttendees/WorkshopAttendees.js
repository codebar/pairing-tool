import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
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
import Box from '@material-ui/core/Box'
import './WorkshopAttendees.scss'

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
          <Input
            icon={<AccountCircle/>}
            control={<TextField id='input-with-icon-grid' label='Name (pronouns)' fullWidth/>}
          />
          <Input
            icon={<Create/>}
            control={<TextField id='input-with-icon-grid' label='Notes' multiline rowsMax={3} fullWidth/>}
          />
          <Skills/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color='secondary'>CANCEL</Button>
          <Button onClick={closeModal} color='primary'>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const Input = ({icon, control}) => {
  return (
    <Grid container spacing={1} alignItems='flex-end'>
      <Grid item xs={1}>{icon}</Grid>
      <Grid item xs={10}>{control}</Grid>
    </Grid>
  )
}

const Skills = () => {
  const skills = ['HTML', 'CSS', 'Javascript', 'Python', 'SQL', 'Java']

  return (
    <div>
      <Grid container spacing={1} alignItems='center'>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <h4>Skills</h4>
          {skills.map(skill => (<Skill name={skill}/>))}
        </Grid>
      </Grid>
    </div>
  )
}

const Skill = ({name}) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState(0)
  const [hover, setHover] = useState(-1)

  const labels = {
    null: 'N/A',
    0: 'N/A',
    1: 'Inexperienced',
    2: 'Basic',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  }

  const toggleSkill = event => {
    setChecked(event.target.checked)
    setValue(0)
  }

  return (
    <Grid container className={'Skill'} spacing={1} alignItems='flex-end'>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={toggleSkill} name={name} color='primary'/>}
          label={name}
        />
      </Grid>
      <Grid item xs={4}>
        <Rating
          className={'SkillRating'}
          name={`${name}-rating`}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          onChangeActive={(event, newHover) => setHover(newHover)}
          disabled={!checked}
        />
      </Grid>
      <Grid item xs={4}>
        {!!checked && value !== null &&
        <Box className={'SkillLegend'} ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      </Grid>
    </Grid>)
}
