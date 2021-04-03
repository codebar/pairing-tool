import React from 'react'
import {useSelector} from 'react-redux'
import {featureEnabled} from '../../../../config/togglesSlice'
import {CsvFileDropDropzone} from './CsvFileDropDropzone'
import {CsvFileDropDnd} from './CsvFileDropDnd'

export const CsvFileDrop = () => {
  const useNewCsvDropZone = useSelector(featureEnabled('csvFileDropzoneWithDnd'))

  return (useNewCsvDropZone
    ? <CsvFileDropDnd/>
    : <CsvFileDropDropzone/>
  )
}
