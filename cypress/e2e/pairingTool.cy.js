describe('The Pairing Tool', () => {

  it('Open the main page', () => {
    cy.visit(Cypress.env('url'))
  })

  it('Upload a workshop CSV file', () => {
    cy.contains('Pairing Tool')
    cy.get('input[type=file]').attachFile('workshop-csv-file.csv')
  })

  it('Select attendees for the workshop', () => {
    cy.contains('Step 2')
    cy.findByText(/Ragnar/).click()
    cy.findByRole('checkbox', {name: /attendance/i}).click()
    cy.findByText(/Lagertha/).click()
    cy.findByRole('checkbox', {name: /attendance/i}).click()
    cy.findByRole('button', {name: /continue to pairings/i}).click()
  })

  // skipped cause drag and drop isn't working properly in the test (it does in the app itself)
  it.skip('Drag and drop coaches and students to match them together', () => {
    cy.contains('Step 3')
    cy.findAllByRole('button', {name: /JAVA/i}).should('exist')
    cy.findAllByRole('button', {name: /JS/i}).should('exist')

    cy.findByText(/Ragnar/).drag('.StudentDropzone')
    cy.findByText(/Lagertha/).drag('.CoachDropzone')

    cy.findAllByRole('button', {name: /JS/i}).should('exist')
    cy.findAllByRole('button', {name: /JAVA/i}).should('not.exist')
  })

})