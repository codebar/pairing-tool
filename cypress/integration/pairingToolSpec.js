describe('The Pairing Tool', () => {

  it('Happy Path', () => {
    cy.visit('/')
    cy.get('[data-test="csv-upload-button"]').attachFile('workshop-csv-file.csv')

    cy.contains('Step 2: Update attendance, skills and add new students or coaches')

    cy.get('[data-test-id="attendee-display-name"]').contains('Ragnar').click()
    cy.get('[data-test-id="attendee-editor-attendance"]').click()

    cy.get('[data-test-id="attendee-display-name"]').contains('Lagertha').click()
    cy.get('[data-test-id="attendee-editor-attendance"]').click()

    cy.get('[data-test-id="update-attendees-step-pairing"]').click()

    cy.contains('Step 3: Start organising the pairs by dragging the names of the participants to groups')

    cy.get('.DraggableStudent').contains('Ragnar').drag('.StudentDropzone')
    cy.get('.DraggableCoach').contains('Lagertha').drag('.CoachDropzone')

    cy.contains('JS')
  })

})
