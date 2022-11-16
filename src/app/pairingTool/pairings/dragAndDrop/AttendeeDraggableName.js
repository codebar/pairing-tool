import React from 'react'
import styled from '@emotion/styled'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Button from '@mui/material/Button'

const Container = styled.div`
  cursor: move;
  margin: 10px;
`
const AttendeeName = styled(Button)`
  background-color: whitesmoke;
  &:hover {
    background-color: whitesmoke;
  }
`

export const AttendeeDraggableName = ({attendee, type}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, drag] = useDrag(() => ({
    type,
    item: { id: attendee.id }
  }), [attendee, type])
  return (
    <Container ref={drag}>
      <AttendeeName variant='outlined' endIcon={<OpenWithIcon/>}>
        {attendee.name}
      </AttendeeName>
    </Container>
  )
}
