import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {coachesSelector, studentsSelector} from './attendees'
import {CsvFileDropzone} from './csv/CsvFileDropzone'
import {AttendeesList} from './cards/AttendeeTable'
import logo from './logo600.png'
import './WorkshopAttendees.scss'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export const WorkshopAttendees = () => {
  const students = useSelector(studentsSelector)
  const coaches = useSelector(coachesSelector)
  const [compact, setCompact] = useState(false)
  const skills = ['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java']

  const initialized = () => students.length > 0 || coaches.length > 0

  const firstStep =
    <div className='FirstStep'>
      <header>
        <img src={logo} />
        <h1>Pairing Tool</h1>
      </header>
      <CsvFileDropzone/>
    </div>

  const secondStep =
    <div className='SecondStep'>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={compact}
              onChange={() => setCompact(!compact)}
              name='compact'
              color='primary'
            />
          }
          label='Compact'
        />
      </div>
      <div className='Students'>
        <h3>Students</h3>
        <AttendeesList skills={skills} data={students} role={'Student'} compact={compact}/>
      </div>
      <div className='Coaches'>
        <h3>Coaches</h3>
        <AttendeesList skills={skills} data={coaches} role={'Coach'} compact={compact}/>
      </div>
    </div>

  return (
    <div className='WorkshopAttendees'>{!initialized() ? firstStep : secondStep}</div>
  )
}
