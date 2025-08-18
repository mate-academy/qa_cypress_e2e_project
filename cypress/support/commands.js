Cypress.Commands.add('dataCy', (v) => cy.get(`[data-cy="${v}"]`))
