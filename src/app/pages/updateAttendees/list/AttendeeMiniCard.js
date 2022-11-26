import React from 'react'
import styled from '@emotion/styled'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import newbie from './newbie.png'

const CardContainer = styled.div`
  text-align: left;
  padding: 10px 15px;
  margin-bottom: 3px;
  border: ${props => props.isSelected ? '1px solid #8d8d8d' : '1px solid #4e96d0'};
  background-color: ${props => props.isAttending ? '#8ab67c' : '#c2c3c9' };
  box-shadow: ${props => props.isSelected ? '0 0 10px 4px #4e96d0' : '0 0 0 0 black'};
  cursor: default;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &:hover {
    border-color: #97ced2;
    box-shadow: 0 0 10px 4px #97ced2;
  }
`
const FirstTimerIcon = styled.img`
  width: 24px;
  height: 24px;
  padding-right: 15px;
  opacity: ${props => props.isNew ? 1 : 0};
`
const StudentIcon = styled(MenuBookIcon)`
  width: 30px;
  height: 24px;
  padding-right: 15px;
`
const CoachIcon = styled(SchoolIcon)`
  width: 30px;
  height: 24px;
  padding-right: 15px;
`
const NameLabel = styled.span`
  line-height: 24px;
  padding-right: 15px;
`

export const AttendeeMiniCard = ({attendee, selected, onClick}) => (
  <CardContainer
    isSelected={selected}
    isAttending={attendee.attendance}
    onClick={onClick}
  >
    <FirstTimerIcon isNew={attendee.new} src={newbie} alt='First Timer'/>
    {attendee.role === 'Student' && <StudentIcon alt='Student'/>}
    {attendee.role === 'Coach' && <CoachIcon alt='Coach' />}
    <NameLabel>{attendee.name}</NameLabel>
  </CardContainer>
)
