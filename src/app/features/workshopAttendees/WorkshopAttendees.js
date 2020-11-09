import React from 'react'
import {useSelector} from 'react-redux'
import {coachesSelector, studentsSelector} from './attendees'
import {CsvFileDropzone} from './csv/CsvFileDropzone'
import {Something} from './cards/AttendeeTable'
import logo from './logo600.png'
import './WorkshopAttendees.scss'

export const WorkshopAttendees = () => {
  const students = useSelector(studentsSelector)
  const coaches = useSelector(coachesSelector)
  const skills = ['HTML', 'CSS', 'JS', 'Python', 'SQL', 'Java']

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
      <div className='Students'>
        <h3>Students</h3>
        <Something skills={skills} data={students}/>
      </div>
      <div className='Coaches'>
        <h3>Coaches</h3>
        <Something skills={skills} data={coaches}/>
      </div>
    </div>

  return (
    <div className='WorkshopAttendees'>{!initialized() ? firstStep : secondStep}</div>
  )
}
