import React from 'react'
import styled from '@emotion/styled'
import {NavigationBar} from './navigation/NavigationBar'
import {PairingTool} from './pairingTool/PairingTool'

const AppContainer = styled.div`
  height: 100vh;
  text-align: center;
  background-color: #fdfaf6;
  display: grid;
  grid-template:
          'header' 60px
          'content' 1fr
          / 1fr;
`
const AppHeader = styled.div`
  grid-area: header;
`
const AppContent = styled.div `
  grid-area: content;
  overflow: auto;
`

export const App = () => (
  <AppContainer>
    <AppHeader>
      <NavigationBar/>
    </AppHeader>
    <AppContent>
      <PairingTool/>
    </AppContent>
  </AppContainer>
)
