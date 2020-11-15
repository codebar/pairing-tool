import React from 'react'
import {useSelector} from 'react-redux'
import {selectLanguages} from '../../configuration/configurationSlice'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './AttendeeCompactCard.scss'

export const AttendeeCompactCard = ({data}) => {
  const languages = useSelector(selectLanguages)
  return (
    <Card className='AttendeeCompactCard'>
      <CardContent className='CardContent'>
        <span className='CardName'>{data.name}</span>
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
      </CardContent>
    </Card>
  )
}
