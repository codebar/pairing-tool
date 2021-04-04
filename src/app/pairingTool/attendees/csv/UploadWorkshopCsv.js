import React from 'react'
import {useSelector} from 'react-redux'
import {featureEnabled} from '../../../../config/togglesSlice'
import {CsvFileDropDropzone} from './CsvFileDropDropzone'
import {CsvFileDropDnd} from './CsvFileDropDnd'

export const UploadWorkshopCsv = () => {
  const useNewCsvDropZone = useSelector(featureEnabled('csvUploadNewButton'))

  return (useNewCsvDropZone
    ? <CsvFileDropDnd/>
    : <CsvFileDropDropzone/>
  )
}
