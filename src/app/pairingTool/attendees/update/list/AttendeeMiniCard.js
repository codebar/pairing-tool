/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import newbie from './newbie.png'

const cardStyle = (selected, attendance) => {
  const baseStyle = {
    testAlign: 'left',
    padding: '10px 15px',
    marginBottom: '3px',
    border: '1px solid #8d8d8d',
    cursor: 'default',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    '&:hover' : { borderColor: '#97ced2', boxShadow: '0 0 10px 4px #97ced2'},
  }
  if (selected) {
    baseStyle.border = '1px solid #4e96d0'
    baseStyle.boxShadow = '0 0 10px 4px #4e96d0'
  }
  if (attendance) {
    baseStyle.backgroundColor = '#8ab67c'
  }
  else {
    baseStyle.backgroundColor = '#c2c3c9'
  }
  return baseStyle
}

const roleIcon = css`
  width: 30px;
  height: 24px;
  padding-right: 15px;
`

const firstTimerIcon = (isNew) => isNew
  ? {
    width: '24px',
    height: '24px',
    paddingRight: '15px'
  }
  : {
    opacity: 0
  }

const nameLabel = css`
  line-height: 24px;
  padding-right: 15px;
`

export const AttendeeMiniCard = ({attendee, selected, onClick}) => (
  <div
    data-test-id='attendee-display-name'
    style={cardStyle(selected, attendee.attendance)}
    onClick={onClick}
  >
    <img style={firstTimerIcon(attendee.new)} src={newbie} alt='First Timer'/>
    {attendee.role === 'Student' && <MenuBookIcon css={roleIcon}/>}
    {attendee.role === 'Coach' && <SchoolIcon css={roleIcon}/>}
    <span css={nameLabel}>{attendee.name}</span>
  </div>
)
