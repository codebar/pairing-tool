import React from 'react'
import {PairingTool} from './pairingTool/PairingTool'
import smallLogo from './logo200.png'
import './App.scss'

const App = () => (
  <div className='App'>
    <div className='AppHeader'>
      <img alt='Codebar' src={smallLogo} />
      <span>Pairing Tool</span>
    </div>
    <div className='AppContent'>
      <PairingTool/>
    </div>
  </div>
)

export default App
