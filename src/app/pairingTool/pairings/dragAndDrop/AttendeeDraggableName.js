import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Button from '@mui/material/Button'

const draggableButton = (color) => ({
  cursor: 'move',
  margin: '10px',
  '& button': {
    backgroundColor: 'whitesmoke',
    '&:hover' : {backgroundColor: 'whitesmoke'}
  },
  '& button.IsDragging': {
    backgroundColor: color,
    '&:hover' : {backgroundColor: color}
  }
})

export const AttendeeDraggableName = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type,
    item: { id: attendee.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }), [attendee, type])
  return (
    <div ref={drag} style={draggableButton(type === 'Student' ? 'lightpink' : 'lightsalmon')}>
      {/*<Button*/}
      {/*  className={isDragging ? 'IsDragging': ''}*/}
      {/*  variant='contained'*/}
      {/*  color='default'*/}
      {/*  endIcon={<OpenWithIcon/>}*/}
      {/*>*/}
      {/*  {attendee.name}*/}
      {/*</Button>*/}
      {attendee.name} <OpenWithIcon/>
    </div>
  )
}
