describe('User Registration Flow', () => {
  it('should successfully register a new user', () => {
    // Visit the website
    cy.visit('https://www.demoblaze.com/');

    // Click on the "Sign up" button
    cy.get('#signin2').click();

    // Fill out the registration form
    cy.get('#sign-username').type('newUser123');
    cy.get('#sign-password').type('password123');

    // Submit the form
    cy.get('.btn-primary').click();

    // Verify successful registration
    cy.contains('Sign up successful').should('be.visible');
  });
});
