/// <reference types="cypress" />
/// <reference types="../support" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to register a new user', () => {
    cy.task('generateUser').then((user) => {
      cy.visit('/#/register');

      cy.get('input[placeholder="Username"]').type(user.username);
      cy.get('input[placeholder="Email"]').type(user.email);
      cy.get('input[placeholder="Password"]').type(user.password);

      cy.contains('button', 'Sign up').click();

      cy.get('.swal-title', { timeout: 10000 }).should(
        'contain.text',
        'Welcome!'
      );

      cy.get('.swal-text').should(
        'contain.text',
        'Your registration was successful!'
      );
    });
  });

  it('should not register a user with an existing email', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/register');

      cy.get('input[placeholder="Username"]').type(`${user.username}duplicate`);
      cy.get('input[placeholder="Email"]').type(user.email);
      cy.get('input[placeholder="Password"]').type(user.password);

      cy.contains('button', 'Sign up').click();

      cy.get('.swal-title', { timeout: 10000 }).should(
        'contain.text',
        'Registration failed!'
      );
    });
  });
});
