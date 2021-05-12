import React from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useDispatch, useSelector} from 'react-redux'
import {DraggableType} from '../../../config/dnd'
import {featureEnabled} from '../../../config/togglesSlice'
import {autoAssignPairs} from './autoPairing/autoAssignPairs'
import {
  goToReviewAttendeesStep,
  selectAvailableCoaches,
  selectAvailableStudents,
  selectPairingGroups
} from './pairingsSlice'
import {AttendeeCard} from './dragAndDrop/AttendeeCard'
import {AttendeeDraggableName} from './dragAndDrop/AttendeeDraggableName'
import {StudentDropzone} from './dragAndDrop/StudentDropzone'
import {CoachDropzone} from './dragAndDrop/CoachDropzone'
import Button from '@material-ui/core/Button'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import './PairingsStep.scss'

export const PairingsStep = () => {
  const autoAssignButton = useSelector(featureEnabled('autoPairingsButton'))
  const availableStudents = useSelector(selectAvailableStudents)
  const availableCoaches = useSelector(selectAvailableCoaches)
  const groups = useSelector(selectPairingGroups)
  const dispatch = useDispatch()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='PairingsStep'>
        <div className='PairingsStepHeader'>
          <span>Step 3: Start organising the pairs by dragging the names of the participants to groups</span>
          <Button
            className='PairingsStepBack'
            variant='contained'
            color='primary'
            startIcon={<SkipPreviousIcon/>}
            onClick={() => dispatch(goToReviewAttendeesStep())}
          >
            Review attendance and skills
          </Button>
          {
            autoAssignButton &&
            <Button
              className='PairingsStepAutoAssign'
              variant='contained'
              color='secondary'
              endIcon={<GroupAddIcon/>}
              onClick={() => dispatch(autoAssignPairs())}
            >
              Auto-Assign Pairs
            </Button>
          }
        </div>
        <div className='PairingsStepContent'>

          <div className='Attendees'>
            <h4>Students</h4>
            <StudentDropzone groupId={0}>
              {availableStudents.map(student => <AttendeeCard data={student} type={DraggableType.STUDENT}/>)}
              {availableStudents.length === 0 && <span className='EmptyDropzone'>Drag a student here</span>}
            </StudentDropzone>
            <h4>Coaches</h4>
            <CoachDropzone groupId={0}>
              {availableCoaches.map(coach => <AttendeeCard data={coach} type={DraggableType.COACH}/>)}
              {availableCoaches.length === 0 && <span className='EmptyDropzone'>Drag a coach here</span>}
            </CoachDropzone>
          </div>

          <div className='Pairs'>
            <h4>Pairs</h4>
            {groups.map(group =>
              <div className='PairingGroup'>
                <StudentDropzone groupId={group.id}>
                  {group.students.map(student => <AttendeeDraggableName attendee={student} type={DraggableType.STUDENT}/>)}
                  {group.students.length === 0 && <span className='EmptyDropzone'>Drag a student here</span>}
                </StudentDropzone>
                <CoachDropzone groupId={group.id}>
                  {group.coaches.map(coach => <AttendeeDraggableName attendee={coach} type={DraggableType.COACH}/>)}
                  {group.coaches.length === 0 && <span className='EmptyDropzone'>Drag a coach here</span>}
                </CoachDropzone>
                <div className='PairingGroupLanguages'>
                  {group.languages.map(language =>
                    <Button
                      className={`${language}Button Active`}
                      variant='contained'
                      color='primary'
                    >
                      {language}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </DndProvider>
  )
}
