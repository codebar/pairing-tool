import React from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useDispatch, useSelector} from 'react-redux'
import {useDrag, useDrop} from 'react-dnd'
import {DraggableType} from '../../../config/dnd'
import {reviewAttendeesAgain} from '../attendees/attendeesSlice'
import {
  dragCoachToGroup,
  dragStudentToGroup,
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
            {availableStudents.map(student => <DraggableCard attendee={student}/>)}
            <h4>Coaches</h4>
            {availableCoaches.map(coach => <DraggableCard attendee={coach} />)}
          </div>
          <div className='Pairs'>
            <h4>Pairs</h4>
            {groups.map(group =>
              <div className='PairingGroup'>
                <StudentDrop groupId={group.id}/>
                <CoachDrop groupId={group.id}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}


const DraggableCard = ({attendee}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: attendee.role, id: attendee.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} className={`Available${attendee.role}${isDragging && ' Dragging'}`}>
      <AttendeeCompactCard data={attendee}/>
    </div>
  )
}

const StudentDrop = ({groupId}) => {
  const dispatch = useDispatch()
  const students = useSelector(state => state.pairings.groups.find(group => group.id === groupId).students)
  const [{ isOver }, drop] = useDrop({
    accept: DraggableType.STUDENT,
    drop: item => dispatch(dragStudentToGroup(item.id, groupId)),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='StudentsDrop'>
      {students.length > 0 && students.map(student => <div>{student.name}</div>)}
      {students.length <= 0 && <span>Drag a student here</span>}
    </div>
  )
}

const CoachDrop = ({groupId}) => {
  const dispatch = useDispatch()
  const coaches = useSelector(state => state.pairings.groups.find(group => group.id === groupId).coaches)
  const [{ isOver }, drop] = useDrop({
    accept: DraggableType.COACH,
    drop: item => dispatch(dragCoachToGroup(item.id, groupId)),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='CoachesDrop'>
      {coaches.length > 0 && coaches.map(coach => <div>{coach.name}</div>)}
      {coaches.length <= 0 && <span>Drag a coach here</span>}
    </div>
  )
}
