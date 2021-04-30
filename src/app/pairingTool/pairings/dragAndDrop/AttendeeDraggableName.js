import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import Button from '@material-ui/core/Button'
import './AttendeeDraggableName.scss'

export const AttendeeDraggableName = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type,
    item: { id: attendee.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }), [attendee, type])
  return (
    <div ref={drag} className={`Draggable${type}${isDragging === true ? ' Dragging' : ''}`}>
      <Button className='Button' variant='contained' color='default' endIcon={<OpenWithIcon/>}>{attendee.name}</Button>
    </div>
  )
}
