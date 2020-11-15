import React from 'react'
import {useSelector} from 'react-redux'
import {selectReadyForAttendanceReview, selectReadyForPairing} from './attendees/attendeesSlice'
import {CsvParseStep} from './attendees/csv/CsvParseStep'
import {UpdateAttendeesStep} from './attendees/update/UpdateAttendeesStep'
import {PairingsStep} from './pairings/PairingsStep'
import './PairingTool.scss'

export const PairingTool = () => {
  const initialized = useSelector(selectReadyForAttendanceReview)
  const readyForPairing = useSelector(selectReadyForPairing)

  return (
    <div className='PairingTool'>
      {!readyForPairing && !initialized && <CsvParseStep/>}
      {!readyForPairing && initialized && <UpdateAttendeesStep/>}
      {readyForPairing && <PairingsStep/>}
    </div>
  )
}
