/// <reference types="cypress" />
describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });
  
  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/login');
    
    cy.getByDataCy('email-sign-in')
      .type(user.email);
    cy.getByDataCy('password-sign-in')
      .type(user.password);
    cy.getByDataCy('sign-in-btn')
      .click();
    cy.getByDataCy('username-link')
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong credentials(email)', () => {
    const errorMessage = 'Email must be a valid email.';
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/login');
    
    cy.getByDataCy('email-sign-in')
      .type('wrongemail');
    cy.getByDataCy('password-sign-in')
      .type(user.password);
    cy.getByDataCy('sign-in-btn')
      .click();
    cy.get('.swal-text')
      .should('have.text', errorMessage);
  });

  it('should not provide an ability to log in with wrong credentials(password)', () => {
    const errorMessage = 'Invalid user credentials.';
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/login');

    cy.getByDataCy('email-sign-in')
      .type(user.email);
    cy.getByDataCy('password-sign-in')
      .type('wrongpassword');
    cy.getByDataCy('sign-in-btn')
      .click();
    cy.get('.swal-text')
      .should('have.text', errorMessage);
  });
});
