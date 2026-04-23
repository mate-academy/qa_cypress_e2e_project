/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((res) => {
      user = res;
    });
    cy.visit('/#/register');
  });

  it('should register a new user', () => {
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Sign up').click();

    cy.get('[data-cy="username-link"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', user.username);
  });

  it('should not register with an already taken email', () => {
    cy.register(user.email, user.username, user.password);

    cy.get('input[placeholder="Username"]').type('SomeOtherName');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Sign up').click();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });
});
