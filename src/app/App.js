/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useState} from 'react'
import {Alert, AlertTitle} from '@mui/material'
import {FeedbackLink} from './navigation/FeedbackLink'
import {NavigationBar} from './navigation/NavigationBar'
import {PairingTool} from './pairingTool/PairingTool'

const appStyle = css`
  height: 100vh;
  text-align: center;
  background-color: #fdfaf6;
  display: grid;
  grid-template:
          'header' 60px
          'content' 1fr
          / 1fr;
`

const headerStyle = css`
  grid-area: header;
`

const contentStyle = css`
  grid-area: content;
  overflow: auto;
`

const noticeStyle = css`
  .MuiAlert-message { margin: 0 auto; }
  .MuiAlert-action { margin-left: 0 }
  margin: 20px auto;
`

export const App = () => {
  const [displayPrototypeNotice, togglePrototypeNotice] = useState(true)

  return (
    <div css={appStyle}>
      <div css={headerStyle}>
        <NavigationBar/>
      </div>
      <div css={contentStyle}>
        {displayPrototypeNotice && <PrototypeNotice onClose={() => togglePrototypeNotice(!displayPrototypeNotice)}/>}
        <PairingTool/>
      </div>
    </div>
  )
}

const PrototypeNotice = ({onClose}) =>
  <div css={noticeStyle}>
    <Alert severity='info' color='warning' onClose={onClose}>
      <AlertTitle>The Pairing Tool is currently a prototype</AlertTitle>
      There is a list of known limitations available in the&nbsp;
      <a href='https://github.com/codebar/pairing-tool/blob/main/doc/UserManual.md' target='_blank' rel='noreferrer'>
        user manual
      </a>
      <br/>
      Your feedback at this stage is <strong>highly appreciated!</strong>!&nbsp;
      <FeedbackLink>Contact the maintainers</FeedbackLink>
    </Alert>
  </div>
