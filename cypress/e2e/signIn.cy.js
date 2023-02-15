/// <reference types="cypress" />
/// <reference types="../support" />

const { generateUser } = require("../support/generate");

describe('Sign In page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');
  });
  
  it('should log in with existing credentials', () => {
    const { username, email, password } = generateUser();
    cy.register(username, email, password);

    cy.getByDataCy('email-sign-in')
      .type(email);
    
    cy.getByDataCy('password-sign-in')
      .type(password);
    
    cy.getByDataCy('sign-in-btn')
      .click();

    cy.contains('a', username)
      .should('exist');
  });

  it('should not log in with wrong email', () => {
    const { username, email, password } = generateUser();
    cy.register(username, email, password);

    cy.getByDataCy('email-sign-in')
      .type(`wrong${email}`);
    
    cy.getByDataCy('password-sign-in')
      .type(password);
    
    cy.getByDataCy('sign-in-btn')
      .click();

    cy.contains('div', 'Invalid user credentials.')
      .should('exist');
  });

  it('should not log in with wrong password', () => {
    const { username, email, password } = generateUser();
    cy.register(username, email, password);

    cy.getByDataCy('email-sign-in')
      .type(email);
    
    cy.getByDataCy('password-sign-in')
      .type(`wrong${password}`);
    
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.contains('div', 'Invalid user credentials.')
      .should('exist');
  });

  it('should not log in with empty email field', () => {
    const { username, email, password } = generateUser();
    cy.register(username, email, password);
    
    cy.getByDataCy('password-sign-in')
      .type(password);
    
    cy.getByDataCy('sign-in-btn')
      .click();

    cy.contains('div', 'Email field required.')
      .should('exist');
  });

  it('should not log in with empty password field', () => {
    const { username, email, password } = generateUser();
    cy.register(username, email, password);

    cy.getByDataCy('email-sign-in')
      .type(email);
    
    cy.getByDataCy('sign-in-btn')
      .click();

    cy.contains('div', 'Password field required.')
      .should('exist');
  });
});
