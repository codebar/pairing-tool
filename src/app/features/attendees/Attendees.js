import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {attendeesInitializedSelector, coachesSelector, studentsSelector} from './attendeesSlice'
import {CsvFileDropzone} from './csv/CsvFileDropzone'
import {AttendeesList} from './cards/AttendeeList'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import logo from './logo600.png'
import './Attendees.scss'

export const Attendees = () => {
  const initialized = useSelector(attendeesInitializedSelector)
  return (
    <div className='Attendees'>
      {!initialized ? <FirstStep/> : <SecondStep/>}
    </div>
  )
}

const FirstStep = () => {
  return (
    <div className='FirstStep'>
      <img src={logo} alt='Codebar'/>
      <h1>Pairing Tool</h1>
      <CsvFileDropzone/>
    </div>
  )
}

const SecondStep = () => {
  const students = useSelector(studentsSelector)
  const coaches = useSelector(coachesSelector)
  const [compact, setCompact] = useState(false)
  return (
    <div className='SecondStep'>
      <div className='SecondStepHeader'>
        <FormControlLabel
          control={<Switch checked={compact} onChange={() => setCompact(!compact)} name='compact' color='primary'/>}
          label='Compact'
        />
      </div>
      <div className='SecondStepContent'>
        <div className='Students'>
          <h3>Students</h3>
          <AttendeesList data={students} compact={compact}/>
        </div>
        <div className='Coaches'>
          <h3>Coaches</h3>
          <AttendeesList data={coaches} compact={compact}/>
        </div>
      </div>
    </div>
  )
}