import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectAvailableCoaches, selectAvailableStudents} from '../../features/pairingsSlice'
import {Droppable} from 'react-beautiful-dnd'
import {Attendee} from './Attendee'

const AttendeeDropArea = styled.div`
  min-height: 80px;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 8px;
  background-color: ${props => props.draggingOver ? 'rgba(0,126,104,0.64)' : 'whitesmoke'};
`
const EmptyGroup = styled.span`
  padding:10px;
  color: #757575;
`

const AvailableAttendees = ({type, attendees}) => (
  <Droppable droppableId={`${type}-0`}>
    { (provided, snapshot) => (
      <AttendeeDropArea
        ref={provided.innerRef}
        {...provided.droppableProps}
        draggingOver={snapshot.isDraggingOver}
      >
        {attendees.length === 0 && <EmptyGroup>Drag a {type} here</EmptyGroup>}
        {attendees.map((attendee, index) => <Attendee key={attendee.id} index={index} attendee={attendee} />)}
        {provided.placeholder}
      </AttendeeDropArea>
    )}
  </Droppable>
)
export const AvailableStudents = () => {
  const availableStudents = useSelector(selectAvailableStudents)
  return (
    <AvailableAttendees type={'Student'} attendees={availableStudents}/>
  )
}
export const AvailableCoaches = () => {
  const availableCoaches = useSelector(selectAvailableCoaches)
  return (
    <AvailableAttendees type={'Coach'} attendees={availableCoaches}/>
  )
}
