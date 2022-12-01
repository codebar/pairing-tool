import React from 'react'
import styled from '@emotion/styled'
import {Droppable} from 'react-beautiful-dnd'
import {Attendee} from './Attendee'

const AttendeeDropArea = styled.div`
  min-height: 80px;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 8px;
`
const EmptyGroup = styled.span`
  padding:10px;
  color: #757575;
`

const AvailableAttendees = ({type, attendees}) => (
  <Droppable droppableId={`${type}-0`}>
    {(provided, snapshot) => (
      <AttendeeDropArea
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {attendees.map((attendee, index) => <Attendee key={index} index={index} attendee={attendee}/>)}
        {attendees.length === 0 && <EmptyGroup>Drag a {type} here</EmptyGroup>}
        {provided.placeholder}
      </AttendeeDropArea>
    )}
  </Droppable>
)
export const AvailableStudents = ({students}) => <AvailableAttendees type='student' attendees={students}/>
export const AvailableCoaches = ({coaches}) => <AvailableAttendees type='coach' attendees={coaches}/>
