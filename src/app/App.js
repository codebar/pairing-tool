import React from 'react'
import {Attendees} from './features/attendees/Attendees'
import smallLogo from './logo200.png'
import './App.scss'

const App = () => (
  <div className='App'>
    <div className='AppHeader'>
      <img alt='Codebar' src={smallLogo} />
      <span>Pairing Tool</span>
    </div>
    <div className='AppContent'>
      <Attendees/>
    </div>
  </div>
)

export default App
