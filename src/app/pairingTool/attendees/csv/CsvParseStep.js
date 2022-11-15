import React from 'react'
import styled from '@emotion/styled'
import {UploadCsvButton} from './UploadCsvButton'
import pairingCsvImg from './pairingCsvImg.png'

const Container = styled.div`
  display:flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 800px;

  span {
    font-size: 18px;
    font-weight: bold;
    margin: 40px auto 10px auto;
  }

  img {
    width: 798px;
    height: 160px;
    margin-bottom: 40px;
    border: 1px solid grey;
    border-radius: 10px;
  }
`

export const CsvParseStep = () => {
  return (
    <Container>
      <span>Step 1: Download the pairing CSV from the workshop page</span>
      <img alt='Pairing CSV' src={pairingCsvImg} />
      <span>And click on this button to select and upload the CSV file</span>
      <UploadCsvButton/>
    </Container>
  )
}
