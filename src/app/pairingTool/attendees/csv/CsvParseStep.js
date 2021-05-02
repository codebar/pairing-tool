import React from 'react'
import {UploadCsvButton} from './UploadCsvButton'
import pairingCsvImg from './pairingCsvImg.png'
import './CsvParseStep.scss'

export const CsvParseStep = () => {
  return (
    <div className='CsvParseStep'>
      <span>Step 1: Download the pairing CSV from the workshop page</span>
      <img alt='Pairing CSV' src={pairingCsvImg} />
      <span>And click on this button to select and upload the CSV file</span>
      <UploadCsvButton/>
    </div>
  )
}
