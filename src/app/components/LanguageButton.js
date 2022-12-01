import styled from '@emotion/styled'
import MuiButton from '@mui/material/Button'

const colorCombinations = {
  HTML: '#DC4B26',
  CSS: '#026DB3',
  JS: '#E8A22A',
  Python: '#F8D248',
  Ruby: '#A21401',
  SQL: '#30638B',
  Java: '#E52B29',
  PHP: '#7300E2',
  Other: '#111111'
}

const color = (active, language) => active === 'false' ? colorCombinations[language] : 'white'
const backgroundColor = (active, language) => active !== 'false' ? colorCombinations[language] : 'transparent'

const Button = styled(MuiButton)`
  width: 75px;
  color: ${props => color(props.active, props.language)};
  background-color: ${props => backgroundColor(props.active, props.language)};
  &:hover {
    background-color: ${props => backgroundColor(props.active, props.language)};
  }
`

export const LanguageButton = ({language, active, onClick=()=>{}}) =>
  <Button active={active} language={language} variant='contained' onClick={onClick}>{language}</Button>
