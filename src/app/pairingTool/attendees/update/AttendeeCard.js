import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectLanguages} from '../../../configuration/configurationSlice'
import {toggleAttendance, toggleLanguage} from '../attendeesSlice'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import firstTimer from './firstTimer.jpg'
import './AttendeeCard.scss'

export const AttendeeCard = ({data}) => {
  const languages = useSelector(selectLanguages)
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
        {languages.map(language =>
          <Button
            className={`${language}Button ${data.languages.includes(language) ? 'Active' : 'Inactive'}`}
            variant='contained'
            color='primary'
            onClick={() => dispatch(toggleLanguage({id: data.id, language}))}
          >
            {language}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
