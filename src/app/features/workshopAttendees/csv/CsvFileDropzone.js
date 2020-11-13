import React, {useCallback, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {useDropzone} from 'react-dropzone'
import {parseAttendeeList} from '../attendees'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'solid',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3',
  backgroundColor: '#daefff'
}

const acceptStyle = {
  borderColor: '#00e676',
  backgroundColor: '#e0ffef'
}

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#ffe4e7'
}

export const CsvFileDropzone = () => {
  const dispatch = useDispatch()
  const onDrop = useCallback(
    acceptedFiles => acceptedFiles.forEach(file => dispatch(parseAttendeeList(file))),
    [dispatch]
  )
  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
    onDrop, accept: 'text/csv', maxFiles: 1
  })
  const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <p>To start, download the "Pairing CSV" from the Workshop in the Codebar website</p>
      <p>Drag and Drop it here or Click to select the file</p>
    </div>
  )
}
