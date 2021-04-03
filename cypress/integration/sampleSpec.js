describe('My First Test', () => {

    it('Does not do much!', () => {
        cy.visit('/')
        cy.contains('Drag and Drop')
    })

})
