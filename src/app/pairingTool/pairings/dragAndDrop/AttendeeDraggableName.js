/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Button from '@mui/material/Button'
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
