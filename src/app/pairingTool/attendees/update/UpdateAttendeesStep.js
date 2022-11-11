/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAttendee, goToPairingStep, selectAttendees} from '../attendeesSlice'
import {AttendeeEditor} from './editor/AttendeeEditor'
import {AttendeeMiniCard} from './list/AttendeeMiniCard'
import {Button, IconButton} from '@mui/material'
import {PersonAdd as PersonAddIcon, SkipNext as SkipNextIcon} from '@mui/icons-material'

const style = css`
  display: flex;
  flex-direction: column;`

const headerStyle = css`
  display: flex;
  flex-direction: column;
  &>span {
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
  }
  .UpdateAttendeesStepDone {
    width: 300px;
    margin: 0 auto;
  }`

const contentStyle = css`
  display: flex;
  flex-flow: row nowrap;
  padding: 1%;

  .Students,
  .Coaches {
    width: 50%;

    .AddNew {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      width: 90%;
      margin: 0 auto;
      .AddNewName {
        margin: 0 30px;
      }
    }
  }`




export const UpdateAttendeesStep = () => {
  const [selectedAttendee, setSelectedAttendee] = useState(undefined)
  const attendees = useSelector(selectAttendees)
  const dispatch = useDispatch()

  const selectAttendeeToEdit = attendee => {
    if (selectedAttendee === undefined || selectedAttendee.id !== attendee.id)
      setSelectedAttendee(attendee)
    else
      setSelectedAttendee(undefined)
  }

  const addNewAttendeeButton =
    <div
      aria-label='New Attendee'
      onClick={() => dispatch(addAttendee({name: '', role: 'Student', languages: [], attendance: true}))}
    >
      <IconButton><PersonAddIcon/></IconButton>
    </div>

  const attendeesCards =
    <>
      {attendees.slice().reverse().map(attendee =>
        <AttendeeMiniCard
          key={attendee.id}
          attendee={attendee}
          selected={selectedAttendee !== undefined && selectedAttendee.id === attendee.id}
          onClick={() => selectAttendeeToEdit(attendee)}
        />
      )}
    </>

  return (
    <div css={style}>
      <div css={headerStyle}>
        <span>Step 2: Update attendance, skills and add new students or coaches</span>
        <Button
          className='UpdateAttendeesStepDone'
          variant='contained'
          color='primary'
          endIcon={<SkipNextIcon/>}
          onClick={() => dispatch(goToPairingStep())}
        >
          Continue to pairings
        </Button>
      </div>
      <div css={contentStyle}>
        <div className='Attendees'>
          {addNewAttendeeButton}
          {attendeesCards}
        </div>
        {selectedAttendee !== undefined && <AttendeeEditor attendee={selectedAttendee}/>}
      </div>
    </div>
  )
}
