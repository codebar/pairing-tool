import React from 'react'
import {Icon} from '@material-ui/core'
import newbie from './newbie.png'
import './AttendeeMiniCard.scss'

export const AttendeeMiniCard = ({attendee, selected, onClick}) => {
  const subclass = selected
    ? 'SelectedToEdit'
    : (attendee.attendance
      ? 'IsAttending'
      : 'IsNotAttending'
    )

  const icon = attendee.role === 'Student'
    ? 'fas fa-book-reader'
    : 'fas fa-graduation-cap'

  return (
    <div
      data-test-id='attendee-display-name'
      className={`AttendeeDisplayName ${subclass}`}
      onClick={onClick}
    >
      <img className={`FirstTimerIcon ${attendee.new === false ? 'Hidden' : ''}`} src={newbie} alt='First Timer'/>
      <Icon className={`RoleIcon ${icon}`}/>
      <span className='AttendeeNameLabel'>{attendee.name}</span>
    </div>
  )
}
