describe('The Pairing Tool', () => {

  it('With new upload button', () => {
    cy.visit('/')
    cy.get('[data-test="csv-upload-button"]').attachFile('workshop-csv-file.csv')

    cy.contains('Step 2: Update attendance, skills and add new students or coaches')
  })

})
