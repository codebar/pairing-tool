/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import smallLogo from './logo200.png'
import {FeedbackLink} from './FeedbackLink'

const style = css`
  padding: 5px 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1e21;
  color: white;
  border-bottom: 1px solid grey;
  box-shadow: 2px 2px 2px 2px lightgrey;
  img {
    width: 50px;
    height: 50px;
  }
  span {
    font-size: 24px;
    font-weight: bold;
    font-family: Roboto, serif;
  }
`

export const NavigationBar = () =>
  <div css={style}>
    <div>
      <img alt='Codebar' src={smallLogo} />
    </div>
    <div>
      <span>Pairing Tool</span>
    </div>
    <div>
      <FeedbackLink>
        <ContactSupportIcon css={{fontSize: 40, color: '#fff4e5'}} />
      </FeedbackLink>
    </div>
  </div>
