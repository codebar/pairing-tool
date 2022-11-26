import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectReadyForAttendanceReview, selectReadyForPairing} from './features/attendeesSlice'
import {CsvParseStep} from './pages/parseAttendeesCsv/CsvParseStep'
import {UpdateAttendeesStep} from './pages/updateAttendees/UpdateAttendeesStep'
import {PairingsStep} from './pages/pairAttendees/PairingsStep'

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
