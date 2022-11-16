import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../../configuration/configurationSlice'
import {AttendeeDraggableName} from './AttendeeDraggableName'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const SpacedCard = styled(Card)`
  margin-bottom: 5px;
`
const StyledCardContent = styled(CardContent)`
  padding: 5px 10px 5px 16px !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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

export const AttendeeCard = ({data, type}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <SpacedCard>
      <StyledCardContent>
        <section>
          {languages.map(language =>
            <LanguageButton
              key={language}
              languageColor={colorCombinations[language]}
              knownLanguage={data.languages.includes(language)}
              variant='contained'
            >
              {language}
            </LanguageButton>
          )}
        </section>
        <AttendeeDraggableName attendee={data} type={type}/>
      </StyledCardContent>
    </SpacedCard>
  )
}
