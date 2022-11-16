import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import {selectLanguageNames} from '../../../../configuration/configurationSlice'
import {
  toggleAttendance,
  toggleLanguage,
  toggleRole,
  updateAttendeeName,
  updateAttendeeNotes,
  updateAttendeeSkills,
  updateAttendeeTutorial
} from '../../attendeesSlice'
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Switch
} from '@mui/material'

const Container = styled.div`
  margin: 48px 20px 20px 20px;
  padding: 20px;
  border: 1px solid #8d8d8d;
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
`
const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
const LanguagesContainer = styled.div`
  padding: 20px 0;
  text-align: left;
`
const LanguageButton = styled(Button)`
  color: ${props => props.knownLanguage ? 'white' : props.languageColor};
  background-color: ${props => props.knownLanguage ? props.languageColor : 'transparent'};
  &:hover {
    background-color: ${props => props.knownLanguage ? props.languageColor : 'transparent'};
  }
`
const colorCombinations = {
  HTML:'#DC4B26',
  CSS:'#026DB3',
  JS:'#E8A22A',
  Python:'#F8D248',
  Ruby:'#A21401',
  SQL:'#30638B',
  Java:'#E52B29',
  PHP:'#7300E2',
  Other:'#111111'
}

export const AttendeeEditor = ({attendee}) => {
  const globalLanguages = useSelector(selectLanguageNames)
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState(false)
  const [role, setRole] = useState('')
  const [notes, setNotes] = useState('')
  const [skills, setSkills] = useState('')
  const [tutorial, setTutorial] = useState('')
  const [languages, setLanguages] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setName(attendee.name)
    setAttendance(attendee.attendance)
    setRole(attendee.role)
    setNotes(attendee.notes)
    setSkills(attendee.skills !== undefined ? attendee.skills : '')
    setTutorial(attendee.tutorial !== undefined ? attendee.tutorial : '')
    setLanguages(attendee.languages)
  }, [
    attendee.name,
    attendee.attendance,
    attendee.role,
    attendee.notes,
    attendee.skills,
    attendee.tutorial,
    attendee.languages
  ])

  const nameInput =
    <TextField
      style={{flexGrow: 2}}
      label='Name'
      value={name}
      onChange={e => setName(e.target.value)}
      onBlur={() => dispatch(updateAttendeeName({id: attendee.id, name}))}
    />

  const attendanceSwitch =
    <FormControlLabel
      label='Attendance'
      labelPlacement='top'
      control={
        <Switch
          name='attendance'
          color='primary'
          checked={attendance}
          onChange={() => {
            setAttendance(!attendance)
            dispatch(toggleAttendance(attendee.id))
          }}
        />
      }
    />

  const roleRadioButtons =
    <FormControl component='fieldset'>
      <RadioGroup
        aria-label='role'
        name='role'
        value={role}
        onChange={e => {
          setRole(e.target.value)
          dispatch(toggleRole(attendee.id))
        }}
      >
        <FormControlLabel label='Student' value='Student' control={<Radio />}/>
        <FormControlLabel label='Coach' value='Coach' control={<Radio />}/>
      </RadioGroup>
    </FormControl>

  const notesTextarea =
    <TextField
      label='Notes'
      fullWidth
      multiline
      maxRows={2}
      value={notes}
      onChange={e => setNotes(e.target.value)}
      onBlur={() => dispatch(updateAttendeeNotes({id: attendee.id, notes}))}
    />

  const skillsTextarea =
    <TextField
      label='Skills'
      fullWidth
      multiline
      maxRows={2}
      value={skills}
      onChange={e => setSkills(e.target.value)}
      onBlur={() => dispatch(updateAttendeeSkills({id: attendee.id, skills}))}
    />

  const tutorialInput =
    <TextField
      label='Tutorial'
      fullWidth
      value={tutorial}
      onChange={e => setTutorial(e.target.value)}
      onBlur={() => dispatch(updateAttendeeTutorial({id: attendee.id, tutorial}))}
    />

  const languageButtons =
    <LanguagesContainer>
      {globalLanguages.map(language =>
        <LanguageButton
          key={language}
          languageColor={colorCombinations[language]}
          knownLanguage={languages.includes(language)}
          variant='contained'
          onClick={() => {
            if (!languages.includes(language))
              setLanguages([...languages, language])
            else {
              const index = languages.indexOf(language)
              setLanguages([
                ...languages.slice(0, index),
                ...languages.slice(index + 1)
              ])
            }
            dispatch(toggleLanguage({id: attendee.id, language}))
          }}
        >
          {language}
        </LanguageButton>
      )}
    </LanguagesContainer>

  return (
    <Container>
      <Row>
        {nameInput}
        {attendanceSwitch}
        {roleRadioButtons}
      </Row>
      <Row>
        {notesTextarea}
      </Row>
      <Row>
        {skillsTextarea}
      </Row>
      <Row>
        {tutorialInput}
      </Row>
      <Row>
        {languageButtons}
      </Row>
    </Container>
  )
}
