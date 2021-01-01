import React from 'react'
import {useDrag} from 'react-dnd'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import Button from '@material-ui/core/Button'
import './DraggableName.scss'

export const DraggableName = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag({
    item: {type, id: attendee.id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} className={`Available${type}${isDragging === true ? ' Dragging' : ''}`}>
      <Button className='Button' variant='contained' color='default' endIcon={<OpenWithIcon/>}>{attendee.name}</Button>
    </div>
  )
}
