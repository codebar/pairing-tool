describe('The Pairing Tool', () => {

  it('Happy Path', () => {
    cy.visit('/')

    cy.contains('Pairing Tool')
    cy.findByTestId('csv-upload-button').attachFile('workshop-csv-file.csv')

    cy.contains('Step 2')
    cy.findByText(/Ragnar/).click()
    cy.findByTestId('attendee-editor-attendance').click()
    cy.findByText(/Lagertha/).click()
    cy.findByTestId('attendee-editor-attendance').click()
    cy.findByTestId('update-attendees-step-pairing').click()

    cy.contains('Step 3')
    cy.findByText(/Ragnar/).drag('.StudentDropzone')
    cy.findByText(/Lagertha/).drag('.CoachDropzone')
    cy.contains('JS')
  })

})
