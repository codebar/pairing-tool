import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectReadyForAttendanceReview, selectReadyForPairing} from './attendees/attendeesSlice'
import {CsvParseStep} from './attendees/csv/CsvParseStep'
import {UpdateAttendeesStep} from './attendees/update/UpdateAttendeesStep'
import {PairingsStep} from './pairings/PairingsStep'

const Container = styled.div`
  padding-top: 20px;
`

export const PairingTool = () => {
  const initialized = useSelector(selectReadyForAttendanceReview)
  const readyForPairing = useSelector(selectReadyForPairing)

  return (
    <Container>
      {!readyForPairing && !initialized && <CsvParseStep/>}
      {!readyForPairing && initialized && <UpdateAttendeesStep/>}
      {readyForPairing && <PairingsStep/>}
    </Container>
  )
}
