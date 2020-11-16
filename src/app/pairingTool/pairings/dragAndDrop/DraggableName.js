import React from 'react'
import {useDrag} from 'react-dnd'
import './DraggableName.scss'

export const DraggableName = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag({
    item: {type, id: attendee.id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} className={`Available${type}${isDragging && ' Dragging'}`}>
      <span>{attendee.name}</span>
    </div>
  )
}
