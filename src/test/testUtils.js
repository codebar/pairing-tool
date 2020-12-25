import React from 'react'
import {Provider} from 'react-redux'
import {createStore, storeInitialState} from '../config/store'
import {render as reactRender} from '@testing-library/react'

export const testStore = (initialState = storeInitialState) =>
    createStore(initialState)

export const render = (component, store = testStore()) =>
    reactRender(<Provider store={store}>{component}</Provider>)
