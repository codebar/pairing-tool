import {render, screen} from '@testing-library/react'
import {AttendeeMiniCard} from './AttendeeMiniCard'
import {coach, student} from '../../../../test/fixtures/attendees'

describe('The attendee mini card', () => {
  const renderComponent = (attendee, selected = false) => {
    render(<AttendeeMiniCard attendee={attendee} selected={selected} onClick={jest.fn()}/>)
  }

  describe('The first timer icon', () => {
    it('Displays the first timer icon when attendee is a first timer', () => {
      renderComponent({...student, 'new': true})
      expect(screen.getByRole('img', {alt: /first timer/i})).toBeVisible()
    })
    it('Does not display the first timer icon when attendee is a not a first timer', () => {
      renderComponent({...student, 'new': false})
      expect(screen.getByRole('img', {alt: /first timer/i})).not.toBeVisible()
    })
  })

  describe('The role icon', () => {
    it('Renders the student icon if attendee is a student', () => {
      renderComponent(student)
      expect(screen.getByRole('img', {alt: /student/i})).toBeInTheDocument()
    })
    it('Renders the coach icon if attendee is a coach', () => {
      renderComponent(coach)
      expect(screen.getByRole('img', {alt: /coach/i})).toBeInTheDocument()
    })
  })

  describe('The card style', () => {
    //TODO: think of a more accessible way to design this, color blind people might benefit
    it.skip('Renders present style when attendee is attending', () => {
      renderComponent({...student, attendance: true})
      //expect(card).toHaveClass('IsAttending')
    })
    it.skip('Renders not present style when attendee is not attending', () => {
      renderComponent({...student, attendance: false})
      //expect(card).toHaveClass('IsNotAttending')
    })
    it.skip('Renders selected style when attendee is selected for editing', () => {
      renderComponent(student, true)
      //expect(card).toHaveClass('SelectedToEdit')
    })
  })

})
