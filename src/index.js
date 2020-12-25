import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './config/store'
import * as serviceWorker from './serviceWorker'
import {App} from './app/App'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
      <Provider store={createStore()}>
          <App/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
