import React from 'react'
import {useDispatch} from 'react-redux'
import {useDrop} from 'react-dnd'
import {DraggableType} from '../../../../config/dnd'
import {moveCoachToGroup} from '../pairingsSlice'
import './CoachDrozone.scss'

export const CoachDropzone = ({groupId, children}) => {
  const dispatch = useDispatch()
  const [{isOver}, drop] = useDrop({
    accept: DraggableType.COACH,
    drop: item => dispatch(moveCoachToGroup({coachId: item.id, groupId})),
    collect: monitor => ({isOver: !!monitor.isOver()}),
  })
  return (
    <div ref={drop} className={`CoachDropzone ${isOver && 'IsOver'}`}>
      {children}
    </div>
  )
}
