import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Button from '@mui/material/Button'

export const AttendeeDraggableName = ({attendee, type}) => {
  const [collected, drag] = useDrag(() => ({
    type,
    item: { id: attendee.id }
  }), [attendee, type])
  return (
    <div ref={drag} style={{cursor: 'move', margin: '10px'}}>
      <Button
        style={{backgroundColor: 'whitesmoke', '&:hover' : {backgroundColor: 'whitesmoke'}}}
        variant='outlined'
        endIcon={<OpenWithIcon/>}
      >
        {attendee.name}
      </Button>
    </div>
  )
}
