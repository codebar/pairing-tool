/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useDispatch, useSelector} from 'react-redux'
import {DraggableType} from '../../../config/dnd'
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
import Button from '@mui/material/Button'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Tooltip from '@mui/material/Tooltip'

const headerStyle = css`
  display: flex;
  flex-direction: column;
  &>span {
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
  }
  &>button {
    width: 300px;
    margin: 15px auto;
  }
`
const pairingGroupStyle = css`
  padding: 10px;
  border: 1px dashed #4e555b;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;

  & > * {
    width: 45%;
    overflow: hidden;
  }
`

export const PairingsStep = () => {
  const availableStudents = useSelector(selectAvailableStudents)
  const availableCoaches = useSelector(selectAvailableCoaches)
  const groups = useSelector(selectPairingGroups)
  const dispatch = useDispatch()

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={css`display: flex; flex-direction: column;`}>
        <div css={headerStyle}>
          <span>Step 3: Start organising the pairs by dragging the names of the participants to groups</span>
          <Tooltip
            title='CAREFUL! THIS RESET THE PAIRS :('
            placement='right'
          >
            <Button
              variant='contained'
              color='primary'
              startIcon={<SkipPreviousIcon/>}
              onClick={() => dispatch(goToReviewAttendeesStep())}
            >
            Review attendance and skills
            </Button>
          </Tooltip>
          <Button
            variant='contained'
            color='secondary'
            endIcon={<GroupAddIcon/>}
            onClick={() => dispatch(autoAssignPairs())}
          >
            Auto-Assign Pairs
          </Button>
        </div>
        <div css={css`display: flex;flex-flow: row nowrap;padding: 1%;`}>
          <div css={css`display: flex;flex-direction: column;width: 60%;`}>
            <h4>Students</h4>
            <StudentDropzone groupId={0}>
              {availableStudents.map(student => <AttendeeCard data={student} type={DraggableType.STUDENT}/>)}
              {availableStudents.length === 0 && <span css={css`padding:10px; color: #757575;`}>Drag a student here</span>}
            </StudentDropzone>
            <h4>Coaches</h4>
            <CoachDropzone groupId={0}>
              {availableCoaches.map(coach => <AttendeeCard data={coach} type={DraggableType.COACH}/>)}
              {availableCoaches.length === 0 && <span css={css`padding:10px; color: #757575;`}>Drag a coach here</span>}
            </CoachDropzone>
          </div>

          <div css={css`display: flex; flex-direction: column; width: 40%; padding: 20px;`}>
            <h4>Pairs</h4>
            {groups.map(group =>
              <div css={pairingGroupStyle}>
                <StudentDropzone groupId={group.id}>
                  {group.students.map(student => <AttendeeDraggableName attendee={student} type={DraggableType.STUDENT}/>)}
                  {group.students.length === 0 && <span css={css`padding:10px; color: #757575;`}>Drag a student here</span>}
                </StudentDropzone>
                <CoachDropzone groupId={group.id}>
                  {group.coaches.map(coach => <AttendeeDraggableName attendee={coach} type={DraggableType.COACH}/>)}
                  {group.coaches.length === 0 && <span css={css`padding:10px; color: #757575;`}>Drag a coach here</span>}
                </CoachDropzone>
                <div css={css`width: 100%; padding: 10px;`}>
                  {group.languages.map(language =>
                    <Button
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
