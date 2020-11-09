import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../config/store'
import {WorkshopAttendees} from './WorkshopAttendees'

describe('The Workshop Attendees component', () => {

  it('renders a title and a dropzone', () => {
    const { getByText } = render(
      <Provider store={store}>
        <WorkshopAttendees/>
      </Provider>
    )

    expect(getByText(/Pairing Tool/i)).toBeInTheDocument()
    expect(getByText(/Drag and Drop/i)).toBeInTheDocument()
  })

})

