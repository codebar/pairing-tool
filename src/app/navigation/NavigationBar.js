import React from 'react'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import smallLogo from './logo200.png'
import './NavigationBar.scss'
import {FeedbackLink} from './FeedbackLink'

export const NavigationBar = () =>
  <div className='NavigationBar'>
    <div className='NavLeft'>
      <img alt='Codebar' src={smallLogo} />
    </div>
    <div className='NavMid'>
      <span>Pairing Tool</span>
    </div>
    <div className='NavRight'>
      <FeedbackLink>
        <ContactSupportIcon style={{fontSize: 40, color: '#fff4e5'}} />
      </FeedbackLink>
    </div>
  </div>
