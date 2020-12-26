import React from 'react'
import {PairingTool} from './PairingTool'
import {renderComponent} from '../../test/testUtils'

describe('The Workshop Attendees component', () => {

  it('renders a title and a dropzone', () => {
    const {getByText} = renderComponent(<PairingTool/>)

    expect(getByText(/Pairing Tool/i)).toBeInTheDocument()
    expect(getByText(/Drag and Drop/i)).toBeInTheDocument()
  })

})

