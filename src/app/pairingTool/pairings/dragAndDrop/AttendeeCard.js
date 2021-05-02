import React from 'react'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../../configuration/configurationSlice'
import {AttendeeDraggableName} from './AttendeeDraggableName'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './AttendeeCard.scss'

export const AttendeeCard = ({data, type}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <Card className='AttendeeCard'>
      <CardContent className='CardContent'>
        <section>
          {languages.map(language =>
            <Button
              className={`${language}Button ${data.languages.includes(language) ? 'Active' : 'Inactive'}`}
              variant='contained'
              color='primary'
            >
              {language}
            </Button>
          )}
        </section>
        <AttendeeDraggableName attendee={data} type={type}/>
      </CardContent>
    </Card>
  )
}
