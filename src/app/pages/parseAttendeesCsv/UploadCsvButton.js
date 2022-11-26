import React, {useRef} from 'react'
import styled from '@emotion/styled'
import {useDispatch} from 'react-redux'
import {parseAttendeeList} from '../../features/attendeesSlice'
import {Button} from '@mui/material'

const StyledButton = styled(Button)`
  width: 200px;
  margin: 0 auto !important;
  span {
    margin: 0 !important;
  }
`

export const UploadCsvButton = () => {
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
      <input
        hidden
        type='file'
        accept={'*.csv'}
        ref={inputFile}
        onChange={parseCsv}
      />
      <StyledButton
        variant='contained'
        color='primary'
        onClick={() => inputFile.current.click()}
      >
        Upload CSV
      </StyledButton>
    </>
  )
}
