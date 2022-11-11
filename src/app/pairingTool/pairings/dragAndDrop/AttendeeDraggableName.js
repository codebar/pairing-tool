/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Button from '@mui/material/Button'

const buttonWrapperStyle = css`
  cursor: move;
  margin: 10px;`

const draggableButtonStyle = (color, dragging) => dragging
  ? {
    backgroundColor: color,
    '&:hover' : {backgroundColor: color}
  }
  : {
    backgroundColor: 'whitesmoke',
    '&:hover' : {backgroundColor: 'whitesmoke'}
  }

export const AttendeeDraggableName = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type,
    item: { id: attendee.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }), [attendee, type])
  return (
    <div ref={drag} css={buttonWrapperStyle}>
      <Button style={draggableButtonStyle(type === 'Student' ? 'lightpink' : 'lightsalmon', isDragging)} variant='contained' color='default' endIcon={<OpenWithIcon/>}>{attendee.name}</Button>
    </div>
  )
}
