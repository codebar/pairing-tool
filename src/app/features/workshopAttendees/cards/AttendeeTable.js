import React from 'react'
import {useDispatch} from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import firstTimer from './firstTimer.jpg'
import './AttendeeTable.scss'

export const AttendeesList = ({skills, data, role, compact}) => {
  return (
    // <>
    //   {data.map(row => <AttendeeCard skills={skills} data={row} role={role}/>)}
    // </>
    <>
      {data.map(row => compact
        ? <AttendeeCompactCard skills={skills} data={row} role={role}/>
        : <AttendeeCard skills={skills} data={row} role={role}/>)}
    </>
  )
}

const AttendeeCard = ({skills, data, role}) => {
  const dispatch = useDispatch()

  return (
    <Card className='AttendeeCard'>
      <CardContent>
        <header>
          <h4 className='CardName'>{data.name}</h4>
          {data.new && <img className='CardNew' src={firstTimer} alt='First Timer'/>}
          <Button
            variant='outlined'
            // onClick={() => {
            //   if (role === 'Coach')
            //     dispatch(toggleAttendanceForCoach(data.id))
            //   if (role === 'Student')
            //     dispatch(toggleAttendanceForStudent(data.id))
            // }}
          ><EmojiPeopleIcon/></Button>
        </header>
        <section>
          {!!data.tutorial && <span className='CardTutorial'>{data.tutorial}</span>}
          {!!data.skills && <span className='CardSkills'>{data.skills}</span>}
          <span className='CardNotes'>{data.notes}</span>
        </section>
      </CardContent>
      <CardActions className='CardLanguages'>
        {skills.map(skill =>
          <Button
            className={`${skill}Button ${data.languages.includes(skill) ? 'Active' : 'Inactive'}`}
            variant='contained'
            color='primary'
            // onClick={() => {
            //   if (role === 'Coach')
            //     dispatch(toggleSkillForCoach(data.id, skill))
            //   if (role === 'Student')
            //     dispatch(toggleSkillForStudent(data.id, skill))
            // }}
          >
            {skill}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}


const AttendeeCompactCard = ({skills, data}) => {
  return (
    <Card className='AttendeeCompactCard'>
      <CardContent className='CardContent'>
        <span className='CardName'>{data.name}</span>
        <section>
          {skills.map(skill =>
            <Button
              className={`${skill}Button ${data.languages.includes(skill) ? 'Active' : 'Inactive'}`}
              variant='contained'
              color='primary'
            >
              {skill}
            </Button>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
