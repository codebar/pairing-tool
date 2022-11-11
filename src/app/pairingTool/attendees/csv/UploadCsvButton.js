/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useRef} from 'react'
import {useDispatch} from 'react-redux'
import {parseAttendeeList} from '../attendeesSlice'
import {Button} from '@mui/material'

const style = css`
  width: 300px;
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
        data-test-id='csv-upload-button'
      />
      <Button
        css={style}
        variant='contained'
        color='primary'
        onClick={() => inputFile.current.click()}
      >
        Upload CSV
      </Button>
    </>
  )
}
