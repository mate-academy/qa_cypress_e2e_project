/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to register a user', () => {
    cy.visit('/#/register');
    cy.get('[data-cy="signUpUsername-field"]').type(user.username);
    cy.get('[data-cy="signUpEmail-field"]').type(user.email);
    cy.get('[data-cy="signUpPassword-field"]').type(user.password);
    cy.get('[data-cy="signUp-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Welcome!')
      .should('contain', 'Your registration was successful!')
      .should('contain', 'OK')
      .click();
  });

  it('should not allow to register a user with invalid email', () => {
    cy.visit('/#/register');
    cy.get('[data-cy="signUpUsername-field"]').type(user.username);
    cy.get('[data-cy="signUpEmail-field"]').type(user.username);
    cy.get('[data-cy="signUpPassword-field"]').type(user.password);
    cy.get('[data-cy="signUp-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Registration failed!')
      .should('contain', 'Email must be a valid email.')
      .should('contain', 'OK')
      .click();
  });

  it('should not allow to register a user with invalid password', () => {
    cy.visit('/#/register');
    cy.get('[data-cy="signUpUsername-field"]').type(user.username);
    cy.get('[data-cy="signUpEmail-field"]').type(user.email);
    cy.get('[data-cy="signUpPassword-field"]')
      .type(user.password.substring(0, 2));
    cy.get('[data-cy="signUp-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Registration failed!')
      .should('contain', 'Password must be 8 characters long')
      .should('contain', 'OK')
      .click();
  });
});
