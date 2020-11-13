import React from 'react'
import {useDispatch} from 'react-redux'
import {toggleAttendance, toggleSkill} from '../attendees'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import firstTimer from './firstTimer.jpg'
import './AttendeeList.scss'

export const AttendeesList = ({skills, data, compact}) => {
  return (
    <>
      {data.map(row => compact
        ? <AttendeeCompactCard skills={skills} data={row}/>
        : <AttendeeCard skills={skills} data={row}/>)}
    </>
  )
}

const AttendeeCard = ({skills, data}) => {
  const dispatch = useDispatch()

  return (
    <Card className='AttendeeCard'>
      <CardContent>
        <header>
          <h4 className='CardName'>{data.name}</h4>
          {data.new && <img className='CardNew' src={firstTimer} alt='First Timer'/>}
          <Button
            className={`CardAttending ${data.attendance ? 'Show' : 'NoShow'}`}
            variant='outlined'
            onClick={() => dispatch(toggleAttendance(data.id))}
          ><EmojiPeopleIcon/></Button>
        </header>
        <section>
          {!!data.tutorial && <span className='CardTutorial'>{data.tutorial}</span>}
          {!!data.skills && <span className='CardSkills'>{data.skills}</span>}
          <span className='CardNotes'>{data.notes}</span>
        </section>
      </CardContent>
      <CardActions className='CardLanguages'>
        {skills.map(language =>
          <Button
            className={`${language}Button ${data.languages.includes(language) ? 'Active' : 'Inactive'}`}
            variant='contained'
            color='primary'
            onClick={() => dispatch(toggleSkill({id: data.id, language}))}
          >
            {language}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}


const AttendeeCompactCard = ({skills, data}) => {
  const dispatch = useDispatch()

  return (
    <Card className='AttendeeCompactCard'>
      <CardContent className='CardContent'>
        <span className='CardName'>{data.name}</span>
        <section>
          {skills.map(language =>
            <Button
              className={`${language}Button ${data.languages.includes(language) ? 'Active' : 'Inactive'}`}
              variant='contained'
              color='primary'
              onClick={() => dispatch(toggleSkill({id: data.id, language}))}
            >
              {language}
            </Button>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
