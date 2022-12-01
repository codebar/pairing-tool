import React from 'react'
import styled from '@emotion/styled'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../../settings/settingsSlice'
import {AttendeeDraggableName} from './AttendeeDraggableName'
import {LanguageButton} from '../../../components/LanguageButton'
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

export const AttendeeCard = ({data, type}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <SpacedCard>
      <StyledCardContent>
        <section>
          {languages.map(language =>
            <LanguageButton
              key={language}
              language={language}
              active={data.languages.includes(language).toString()}
            />
          )}
        </section>
        <AttendeeDraggableName attendee={data} type={type}/>
      </StyledCardContent>
    </SpacedCard>
  )
}
