import React from 'react'
import {Attendees} from './features/attendees/Attendees'
import smallLogo from './logo200.png'
import './App.scss'

const App = () => (
  <div className='App'>
    <div className='AppHeader'>
      <img alt='Codebar' src={smallLogo} />
    </div>
    <div className='AppContent'>
      <Attendees/>
    </div>
    <div className='AppFooter'>
      <p>Codebar - Pairing Tool</p>
    </div>
  </div>
)

export default App
