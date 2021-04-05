import React from 'react'
import {useDispatch} from 'react-redux'
import {useDrop} from 'react-dnd'
import {DraggableType} from '../../../../config/dnd'
import {moveStudentToGroup} from '../pairingsSlice'
import './StudentDropzone.scss'

export const StudentDropzone = ({groupId, children}) => {
  const dispatch = useDispatch()
  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableType.STUDENT,
    drop: item => dispatch(moveStudentToGroup({studentId: item.id, groupId})),
    collect: monitor => ({isOver: !!monitor.isOver()}),
  }))
  return (
    <div ref={drop} className={`StudentDropzone ${isOver && 'IsOver'}`}>
      {children}
    </div>
  )
}
