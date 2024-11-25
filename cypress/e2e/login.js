describe('Login Flow', () => {
  it('should load the homepage', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.url().should('include', 'demoblaze.com');
  });

  it('should open the login modal when clicking on the login button', () => {
    cy.contains('Log in').click();
    cy.get('#loginModal').should('be.visible');
  });

  it('should log in with valid credentials', () => {
    cy.contains('Log in').click();
    cy.get('#loginusername').type('testuser'); // Replace with actual username
    cy.get('#loginpassword').type('testpassword'); // Replace with actual password
    cy.contains('Log in').click();

    cy.get('#nameofuser').should('contain.text', 'testuser'); // Check for successful login
  });
});
