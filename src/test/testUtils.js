import React from 'react'
import {Provider} from 'react-redux'
import {createStore, storeInitialState} from '../config/store'
import {render} from '@testing-library/react'

export const testStore = (initialState = storeInitialState) =>
    createStore(initialState)

export const renderComponent = (component, store = testStore()) =>
    render(<Provider store={store}>{component}</Provider>)
