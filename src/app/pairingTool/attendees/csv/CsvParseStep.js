import React from 'react'
import {CsvFileDrop} from './CsvFileDrop'
import pairingCsvImg from './pairingCsvImg.png'
import './CsvParseStep.scss'

export const CsvParseStep = () => {
  return (
    <div className='CsvParseStep'>
      <h1>Pairing Tool</h1>
      <span>Step 1: Download the pairing CSV from the workshop page</span>
      <img alt='Pairing CSV' src={pairingCsvImg} />
      <span>And process the CSV file here</span>
      <CsvFileDrop/>
    </div>
  )
}
