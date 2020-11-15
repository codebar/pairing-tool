import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDrag, useDrop} from 'react-dnd'
import {DraggableType} from '../../../config/dnd'
import {reviewAttendeesAgain} from '../attendees/attendeesSlice'
import {dragCoachToGroup, selectAvailableCoaches, selectAvailableStudents, selectPairingGroups} from './pairingsSlice'
import Button from '@material-ui/core/Button'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import './PairingsStep.scss'

export const PairingsStep = () => {
  const availableStudents = useSelector(selectAvailableStudents)
  const availableCoaches = useSelector(selectAvailableCoaches)
  const groups = useSelector(selectPairingGroups)
  const dispatch = useDispatch()

  return (
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
          {availableStudents.map(student => <DraggableStudent student={student}/>)}
          <h4>Coaches</h4>
          {availableCoaches.map(coach => <DraggableCoach coach={coach} />)}
        </div>
        <div className='Pairs'>
          <h4>Pairs</h4>
          {groups.map(group =>
            <div className='PairingGroup'>
              {group.id}
              <StudentDrop groupId={group.id}/>
              <CoachDrop groupId={group.id}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const DraggableStudent = ({student}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: DraggableType.STUDENT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} className={`AvailableStudent${isDragging && ' Dragging'}`}>{student.name}</div>
  )
}

const DraggableCoach = ({coach}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: DraggableType.COACH, coachId: coach.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return(
    <div ref={drag} className={`AvailableCoach${isDragging && ' Dragging'}`}>{coach.name}</div>
  )
}

const StudentDrop = ({groupId}) => {
  const [{ isOver }, drop] = useDrop({
    accept: DraggableType.STUDENT,
    drop: () => {},
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='StudentsDrop'>&nbsp;</div>
  )
}

const CoachDrop = ({groupId}) => {
  const dispatch = useDispatch()
  const coaches = useSelector(state => state.pairings.groups.find(group => group.id === groupId).coaches)
  const [{ isOver }, drop] = useDrop({
    accept: DraggableType.COACH,
    drop: item => dispatch(dragCoachToGroup(item.coachId, groupId)),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop} className='CoachesDrop'>
      {coaches.length > 0 && coaches.map(coach => <div>{coach.name}</div>)}
      {coaches.length <= 0 && '&nbsp;'}
    </div>
  )
}
