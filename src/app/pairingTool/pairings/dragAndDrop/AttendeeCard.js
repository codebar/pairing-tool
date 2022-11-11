/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import {useSelector} from 'react-redux'
import {selectLanguageNames} from '../../../configuration/configurationSlice'
import {AttendeeDraggableName} from './AttendeeDraggableName'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const style = css`
  padding: 5px 10px 5px 16px !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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

const buttonStyle = (color, active) => active
  ? {
    color: 'white',
    backgroundColor: color,
    '&:hover' : { backgroundColor: color }
  }
  : {
    color,
    backgroundColor: 'transparent',
    '&:hover' : { backgroundColor: 'transparent' }
  }

export const AttendeeCard = ({data, type}) => {
  const languages = useSelector(selectLanguageNames)
  return (
    <Card css={css`margin-bottom: 5px;`}>
      <CardContent css={style}>
        <section>
          {languages.map(language =>
            <Button
              style={buttonStyle(
                colorCombinations[language],
                data.languages.includes(language)
              )}
              variant='contained'
            >
              {language}
            </Button>
          )}
        </section>
        <AttendeeDraggableName attendee={data} type={type}/>
      </CardContent>
    </Card>
  )
}
