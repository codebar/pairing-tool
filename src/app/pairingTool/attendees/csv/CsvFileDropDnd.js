import React, {useRef} from 'react'
import {parseAttendeeList} from '../attendeesSlice'
import {useDispatch} from 'react-redux'
import {Button} from '@material-ui/core'

export const CsvFileDropDnd = () => {
  const dispatch = useDispatch()
  const inputFile = useRef(null)
  const parseCsv = event => {
    const {files} = event.target
    if (files && files.length) {
      dispatch(parseAttendeeList(files[0]))
    }
  }

  return (
    <>
      <input type='file' ref={inputFile} onChange={parseCsv} style={{display: 'none'}} accept={'.csv'}/>
      <Button variant='contained' color='primary' component='span' onClick={() => inputFile.current.click()}>
          Upload CSV
      </Button>
    </>
  )
}
