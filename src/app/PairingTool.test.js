import React from 'react'
import {PairingTool} from './PairingTool'
import {renderComponent} from '../test/testUtils'

describe('The Workshop Attendees component', () => {

  it('renders a title and a dropzone', () => {
    const {getByText} = renderComponent(<PairingTool/>)

    expect(getByText(/Step 1/i)).toBeInTheDocument()
    expect(getByText(/Upload CSV/i)).toBeInTheDocument()
  })

})

