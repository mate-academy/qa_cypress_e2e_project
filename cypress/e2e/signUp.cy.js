/// <reference types="cypress" />
/// <reference types="../support" />

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user= generateUser;
    });
  });

  it('should provide ability to create a new account with right credentials', () => {
    const successfulmessage = 'Your registration was successful!'
    
    cy.getByDataCy('sign-up-link')
      .click();
    cy.url()
      .should('include','register');
    cy.getByDataCy('username-sign-up')
      .type(user.username);
    cy.getByDataCy('email-sign-up')
      .type(user.email);
    cy.getByDataCy('password-sign-up')
      .type(user.password);
    cy.getByDataCy('sign-up-btn')
      .click;

    cy.get('.swal-text')
      .should('contain', successfulmessage);
    cy.contains('OK')
      .click();
    cy.getByDataCy('username-link')
      .should('contain', user.username)

 });
});
it('should not provide ability to create a new account with empty password field', () => {
  const errormessage = 'Password field required.'
  cy.getByDataCy('sign-up-link')
    .click();
  cy.url()
    .should('include','register');
  cy.getByDataCy('username-sign-up')
    .type(user.username);
  cy.getByDataCy('email-sign-up')
    .type(user.email);
  cy.getByDataCy('sign-up-btn')
    .click();

  cy.get('.swal-text')
    .should('contain', errormessage);
  cy.contains('OK')
    .click();
  cy.url()
    .should('include','register');
});
