describe('The Pairing Tool', () => {

  it('Open the main page', () => {
    cy.visit('/')
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

  // skipped cause drag and drop isn't working properly, also maybe we need extra assertions to make the test fail
  it.skip('Drag and drop coaches and students to match them together', () => {
    cy.contains('Step 3')
    cy.findByText(/Ragnar/).drag('.StudentDropzone')
    cy.findByText(/Lagertha/).drag('.CoachDropzone')
    cy.contains('JS')
  })

})
