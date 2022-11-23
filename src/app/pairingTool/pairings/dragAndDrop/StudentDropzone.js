import React from 'react'
import styled from '@emotion/styled'
import {useDispatch} from 'react-redux'
import {useDrop} from 'react-dnd'
import {DraggableType} from '../../../../config/dnd'
import {moveStudentToGroup} from '../pairingsSlice'

const Dropzone = styled.div`
  background-color: #e0e0e0;
  border: 5px dashed #c8c8c8;
  border-radius: 10px;
  padding: 10px;
  &.IsOver {
    background-color: aquamarine;
  }
`

export const StudentDropzone = ({groupId, children}) => {
  const dispatch = useDispatch()
  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableType.STUDENT,
    drop: item => dispatch(moveStudentToGroup({studentId: item.id, groupId})),
    collect: monitor => ({isOver: !!monitor.isOver()}),
  }), [groupId])
  return (
    <Dropzone ref={drop} className={`${groupId === 0 ? 'UnassignedStudent' : 'StudentDropzone'} ${isOver === true ? 'IsOver' : ''}`}>
      {children}
    </Dropzone>
  )
}
