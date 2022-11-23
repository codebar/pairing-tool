import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {createStore} from './config/store'
import {overrideToggle} from './config/togglesSlice'
import * as serviceWorker from './serviceWorker'
import {App} from './app/App'
import './index.css'

const reduxStore = createStore()

new URLSearchParams(window.location.search)
  .forEach((value, key) => reduxStore.dispatch(overrideToggle({toggle: key, value})))

const appContainer = document.getElementById('root')
const root = createRoot(appContainer)
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App/>
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
