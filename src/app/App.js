import React, {useState} from 'react'
import {Alert, AlertTitle} from '@material-ui/lab'
import {FeedbackLink} from './navigation/FeedbackLink'
import {NavigationBar} from './navigation/NavigationBar'
import {PairingTool} from './pairingTool/PairingTool'
import './App.scss'

export const App = () => {
  const [displayPrototypeNotice, togglePrototypeNotice] = useState(true)

  return (
    <div className='App'>
      <div className='AppHeader'>
        <NavigationBar/>
      </div>
      <div className='AppContent'>
        {displayPrototypeNotice && <PrototypeNotice onClose={() => togglePrototypeNotice(!displayPrototypeNotice)}/>}
        <PairingTool/>
      </div>
    </div>
  )
}

const PrototypeNotice = ({onClose}) =>
  <div className='PrototypeNotice'>
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
