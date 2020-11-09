import React from 'react'
import {useSelector} from 'react-redux'

import {CsvFileDropzone} from './CsvFileDropzone'
import {coachesSelector, studentsSelector} from './attendees'

import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'

import './WorkshopAttendees.scss'


export const WorkshopAttendees = () => {
  const students = useSelector(studentsSelector)
  const coaches = useSelector(coachesSelector)
  const skills = ['HTML', 'CSS', 'JS', 'Python', 'SQL', 'Java']

  const initialized = () => students.length > 0 || coaches.length > 0

  const firstStep =
    <div className='FirstStep'>
      <header>
        <h1>Codebar Pairing Tool</h1>
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

const Something = ({skills, data}) => {
  return (
    <TableContainer component={Paper}>
      <Table className={'Tablerone'} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {skills.map(skill => (
              <TableCell>{skill}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                <TextField id='standard-basic' label='Name' value={row.name}/>
              </TableCell>
              {skills.map(skill => (
                <TableCell>
                  <Checkbox checked={row.languages.includes(skill)}/>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
