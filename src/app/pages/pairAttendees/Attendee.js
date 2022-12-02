import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../settings/settingsSlice'
import {Draggable} from 'react-beautiful-dnd'
import {LanguageButton} from '../../components/LanguageButton'
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
const AttendeeName = styled.div`
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  min-width: 100px;
  min-height: 35px;
  background-color: whitesmoke;
  &:hover {
    background-color: whitesmoke;
  }
`

export const Attendee = ({index, attendee}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <Draggable
      key={attendee.id}
      draggableId={attendee.id.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
            <AttendeeName>
              <OpenWithIcon/>
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
    <Draggable
      key={attendee.id}
      draggableId={attendee.id.toString()}
      index={index}
    >
      {provided => (
        <AttendeeName
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <OpenWithIcon/>
          {attendee.name}
        </AttendeeName>
      )}
    </Draggable>
  )
}
