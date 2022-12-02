import React from 'react'
import styled from '@emotion/styled'
import {Droppable} from 'react-beautiful-dnd'
import {LanguageButton} from '../../components/LanguageButton'
import {AttendeeMini} from './Attendee'

const Container = styled.div`
  padding: 10px;
  border: 1px dashed #4e555b;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
  & > * {
    width: 45%;
    overflow: hidden;
  }
`
const AttendeeDropArea = styled.div`
  min-height: 80px;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 8px;
`
const CommonLanguages = styled.div`
  width: 100%;
  padding: 10px;
`

export const AttendeeGroup = ({group}) =>

  <Container>
    <Droppable droppableId={`Student-${group.id}`}>
      {provided => (
        <AttendeeDropArea
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {group.students.map((student, index) => <AttendeeMini index={index} attendee={student} /> )}
          {provided.placeholder}
        </AttendeeDropArea>
      )}
    </Droppable>
    <Droppable droppableId={`Coach-${group.id}`}>
      {provided => (
        <AttendeeDropArea
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {group.coaches.map((coach, index) => <AttendeeMini index={index} attendee={coach} /> )}
          {provided.placeholder}
        </AttendeeDropArea>
      )}
    </Droppable>
    <CommonLanguages>
      {group.languages.map(language => <LanguageButton key={language} language={language} active='true'/> )}
    </CommonLanguages>
  </Container>
