/// <reference types="cypress" />
    
describe('Sign Up page', () => {
  let user;
  

  before(() => {
    
    cy.task('generateUser').then(generatedUser => {
        user = generatedUser;
      });
  });

  it('should allow to rigester user with valid data', () => {

    cy.intercept('POST', '/users')
      .as('register');
    
    cy.visit('/register')

    cy.getByDataCy('sign-up-input-username')
      .type(user.username);
    cy.getByDataCy('sign-up-input-email')
      .type(user.email);
    cy.getByDataCy('sign-up-input-password')
      .type(user.password);
    cy.getByDataCy('sign-up-button')
      .click();

    cy.wait('@register');

    cy.get('.swal-text')
      .should('have.text', 'Your registration was successful!');
    cy.getByDataCy('username-link')
      .should('contain', user.username)
  });

  it('should allow to rigester user with invalid data', () => {

    cy.intercept('POST', '/users')
      .as('register');
    
    cy.visit('/register')

    cy.getByDataCy('sign-up-input-username')
      .type(user.username);
    cy.getByDataCy('sign-up-input-email')
      .type('random');
    cy.getByDataCy('sign-up-input-password')
      .type(user.password);
    cy.getByDataCy('sign-up-button')
      .click();

    cy.wait('@register');

    cy.get('.swal-title')
      .should('have.text', 'Registration failed!');
  });
});
