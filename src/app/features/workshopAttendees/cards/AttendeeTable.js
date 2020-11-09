import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import './AttendeeTable.scss'

export const Something = ({skills, data}) => {
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
            <TableRow key={row.name} className={row.new && 'NewAttendee'}>
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
