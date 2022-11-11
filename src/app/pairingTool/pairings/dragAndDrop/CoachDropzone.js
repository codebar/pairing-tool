/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {useDispatch} from 'react-redux'
import {useDrop} from 'react-dnd'
import {DraggableType} from '../../../../config/dnd'
import {moveCoachToGroup} from '../pairingsSlice'

const dropzone = css`
  background-color: #e0e0e0;
  border: 5px dashed #c8c8c8;
  border-radius: 10px;
  padding: 10px;
  &.IsOver {
    background-color: aquamarine;
  }
`

export const CoachDropzone = ({groupId, children}) => {
  const dispatch = useDispatch()
  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableType.COACH,
    drop: item => dispatch(moveCoachToGroup({coachId: item.id, groupId})),
    collect: monitor => ({isOver: !!monitor.isOver()})
  }), [groupId])
  return (
    <div ref={drop} className={`CoachDropzone ${isOver === true ? 'IsOver' : ''}`} css={dropzone}>
      {children}
    </div>
  )
}
