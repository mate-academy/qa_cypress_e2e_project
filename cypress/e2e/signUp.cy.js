/// <reference types='cypress' />

describe('Sign Up page', () => {
  let user;
  
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
    user = generateUser;
    });
  });

  it('should provide an ability to register a new account', () => {
    const registrationMessage = "Your registration was successful!";

    cy.intercept('POST', '/users')
      .as('registration');
    
    cy.visit('/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-sign-up')
      .type(user.username);
    cy.getByDataCy('email-sign-up')
      .type(user.email);
    cy.getByDataCy('password-sign-up')
      .type(user.password);
    cy.getByDataCy('button-sign-up')
      .click();
    cy.wait('@registration');
    cy.get('.swal-text')
      .should('have.text', registrationMessage);
    cy.getByDataCy('username-link')
      .should('contain', user.username);
  });

  it('should not provide an ability to register a new account with invalid email', () => {
    const errorMessage = "Email must be a valid email. ";
    
    cy.intercept('POST', '/users')
      .as('registration');
    
    cy.visit('/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-sign-up')
      .type(user.username);
    cy.getByDataCy('email-sign-up')
      .type(' ');
    cy.getByDataCy('password-sign-up')
      .type(user.password);
    cy.getByDataCy('button-sign-up')
      .click();
    cy.wait('@registration');
    cy.get('.swal-text')
      .should('have.text', errorMessage);
  });
  it('should not provide an ability to register a new account with invalid password', () => {
    const errorMessage = "Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter. ";
    
    cy.intercept('POST', '/users')
      .as('registration');
    
    cy.visit('/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-sign-up')
      .type(user.username);
    cy.getByDataCy('email-sign-up')
      .type(user.email);
    cy.getByDataCy('password-sign-up')
      .type('test');
    cy.getByDataCy('button-sign-up')
      .click();
    cy.wait('@registration');
    cy.get('.swal-text')
      .should('have.text', errorMessage);
  });
});
