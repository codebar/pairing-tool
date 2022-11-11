import {render} from '@testing-library/react'
import {AttendeeMiniCard} from './AttendeeMiniCard'
import {coach, student} from '../../../../../test/fixtures/attendees'

describe('The attendee mini card', () => {

  const renderComponent = (attendee, selected = false) => {
    const renderResult = {...render(<AttendeeMiniCard attendee={attendee} selected={selected} onClick={jest.fn()}/>)}
    const card = renderResult.getByTestId('attendee-display-name')
    return {
      ...renderResult,
      firstTimerIcon: renderResult.getByAltText('First Timer'),
      roleIcon: card.getElementsByClassName('RoleIcon')[0],
      card
    }
  }

  describe('The first timer icon', () => {
    it('Displays the first timer icon when attendee is a first timer', () => {
      const {firstTimerIcon} = renderComponent({...student, 'new': true})
      expect(firstTimerIcon).not.toHaveClass('Hidden')
    })
    it.skip('Does not display the first timer icon when attendee is a not a first timer', () => {
      const {firstTimerIcon} = renderComponent({...student, 'new': false})
      expect(firstTimerIcon).toHaveClass('Hidden')
    })
  })

  describe('The role icon', () => {
    it.skip('Renders the student icon if attendee is a student', () => {
      const {roleIcon} = renderComponent(student)
      expect(roleIcon).toHaveClass('fa-book-reader')
    })
    it.skip('Renders the coach icon if attendee is a coach', () => {
      const {roleIcon} = renderComponent(coach)
      expect(roleIcon).toHaveClass('fa-graduation-cap')
    })
  })

  describe('The card style', () => {
    it.skip('Renders present style when attendee is attending', () => {
      const {card} = renderComponent({...student, attendance: true})
      expect(card).toHaveClass('IsAttending')
    })
    it.skip('Renders not present style when attendee is not attending', () => {
      const {card} = renderComponent({...student, attendance: false})
      expect(card).toHaveClass('IsNotAttending')
    })
    it.skip('Renders selected style when attendee is selected for editing', () => {
      const {card} = renderComponent(student, true)
      expect(card).toHaveClass('SelectedToEdit')
    })
  })

})
