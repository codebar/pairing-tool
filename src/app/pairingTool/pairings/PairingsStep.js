import React, {useEffect, useState} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useDispatch, useSelector} from 'react-redux'
import {useDrag, useDrop} from 'react-dnd'
import {DraggableType} from '../../../config/dnd'
import {reviewAttendeesAgain} from '../attendees/attendeesSlice'
import {
  moveStudentToGroup,
  moveCoachToGroup,
  selectAvailableCoaches,
  selectAvailableStudents,
  selectPairingGroups
} from './pairingsSlice'
import Button from '@material-ui/core/Button'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import './PairingsStep.scss'
import {AttendeeCompactCard} from './AttendeeCompactCard'

export const PairingsStep = () => {
  const availableStudents = useSelector(selectAvailableStudents)
  const availableCoaches = useSelector(selectAvailableCoaches)
  const groups = useSelector(selectPairingGroups)
  const dispatch = useDispatch()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='PairingsStep'>
        <div className='PairingsStepHeader'>
          <span>Step 3: Let the pairings begin!!!</span>
          <Button
            className='PairingsStepBack'
            variant='contained'
            color='primary'
            startIcon={<SkipPreviousIcon/>}
            onClick={() => dispatch(reviewAttendeesAgain())}
          >
            Review attendance and skills
          </Button>
        </div>
        <div className='PairingsStepContent'>
          <div className='Attendees'>
            <h4>Students</h4>
            {availableStudents.map(student => <DraggableCard attendee={student} type={DraggableType.STUDENT}/>)}
            <h4>Coaches</h4>
            {availableCoaches.map(coach => <DraggableCard attendee={coach} type={DraggableType.COACH}/>)}
          </div>
          <div className='Pairs'>
            <h4>Pairs</h4>
            {groups.map(group =>
              <div className='PairingGroup'>
                <StudentDrop groupId={group.id} students={group.students}/>
                <CoachDrop groupId={group.id} coaches={group.coaches}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}


const DraggableCard = ({attendee, type}) => {
  const [{isDragging}, drag] = useDrag({
    item: {type, id: attendee.id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} className={`Available${type}${isDragging && ' Dragging'}`}>
      <AttendeeCompactCard data={attendee}/>
    </div>
  )
}

const DraggableName = ({attendee, type}) => {
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

const StudentDrop = ({groupId, students = []}) => {
  const dispatch = useDispatch()
    const [{isOver}, drop] = useDrop({
    accept: DraggableType.STUDENT,
    drop: item => dispatch(moveStudentToGroup({studentId: item.id, groupId})),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='StudentsDrop'>
      {students.length > 0 && students.map(student => <DraggableName attendee={student} type={DraggableType.STUDENT}/>)}
      {students.length <= 0 && <span>Drag a student here</span>}
    </div>
  )
}

const CoachDrop = ({groupId, coaches = []}) => {
  const dispatch = useDispatch()
  const [{isOver}, drop] = useDrop({
    accept: DraggableType.COACH,
    drop: item => dispatch(moveCoachToGroup({coachId: item.id, groupId})),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='CoachesDrop'>
      {coaches.length > 0 && coaches.map(coach => <DraggableName attendee={coach} type={DraggableType.COACH}/>)}
      {coaches.length <= 0 && <span>Drag a coach here</span>}
    </div>
  )
}
