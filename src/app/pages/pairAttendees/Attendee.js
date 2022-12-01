import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../settings/settingsSlice'
import {Draggable} from 'react-beautiful-dnd'
import {LanguageButton} from '../../components/LanguageButton'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import OpenWithIcon from '@mui/icons-material/OpenWith'

const Card = styled(MuiCard)`
  margin-bottom: 5px;
`
const CardContent = styled(MuiCardContent)`
  padding: 10px 10px 10px 16px !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
const Languages = styled.div``
const AttendeeName = styled(Button)`
  background-color: whitesmoke;
  &:hover {
    background-color: whitesmoke;
  }
`

export const Attendee = ({index, attendee}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <Draggable key={attendee.id} draggableId={attendee.name} index={index}>
      {provided => (
        <Card ref={provided.innerRef} {...provided.draggableProps}>
          <CardContent>
            <Languages>
              {languages.map(language =>
                <LanguageButton
                  key={language}
                  language={language}
                  active={attendee.languages.includes(language).toString()}
                />
              )}
            </Languages>
            <AttendeeName variant='outlined' endIcon={<OpenWithIcon/>} {...provided.dragHandleProps}>
              {attendee.name}
            </AttendeeName>
          </CardContent>
        </Card>
      )}
    </Draggable>

  )
}

export const AttendeeMini = ({index, attendee}) => {
  return (
    <Draggable key={attendee.id} draggableId={attendee.name} index={index}>
      {provided => (
        <AttendeeName
          ref={provided.innerRef}
          variant='outlined'
          endIcon={<OpenWithIcon/>}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {attendee.name}
        </AttendeeName>
      )}
    </Draggable>
  )
}
