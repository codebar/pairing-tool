import React from 'react'
import {Provider} from 'react-redux'
import store from '../../../../config/store'
import {render} from '@testing-library/react'
import {AttendeesList} from './AttendeeList'

const renderWithStore = ui => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>)
  }
}

describe('The Attendees List Component', () => {

  it('renders students and coaches', () => {
    renderWithStore(<AttendeesList skills={[]} data={[]} compact={false}/>)

  })

})
