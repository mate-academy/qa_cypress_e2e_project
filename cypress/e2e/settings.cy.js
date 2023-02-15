/// <reference types="cypress" />
/// <reference types="../support" />

const { generateUser } = require("../support/generate");

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    const { username, email, password } = generateUser();
    cy.login(username, email, password)

    cy.visit('/#/settings')

    cy.getByDataCy('username')
      .type('_new');
    
    cy.getByDataCy('update')
      .click();
    
    cy.contains('div', 'Update successful!')
      .should('exist');
    
    cy.contains('a', `${username}_new`)
      .should('exist');
  });

  it('should provide an ability to update bio', () => {
    const { username, email, password } = generateUser();
    cy.login(username, email, password);

    cy.visit('/#/settings')
    
    cy.getByDataCy('bio')
      .type('My bio');
    
    cy.getByDataCy('update')
      .click();
    
    cy.contains('div', 'Update successful!')
      .should('exist');
    
    cy.contains('button', 'OK')
      .click();
    
    cy.contains('a', username)
      .click();
    
    cy.contains('p', 'My bio')
      .should('exist');
  });

  it.skip('should provide an ability to update an email', () => {
    const { username, email, password } = generateUser();
    cy.login(username, email, password);

    cy.visit('/#/settings')
    
    cy.getByDataCy('email')
      .type(`{selectAll}new_${email}`);
    
    cy.getByDataCy('update')
      .click();
    
    cy.contains('div', 'Update successful!')
      .should('exist');
        
    cy.contains('button', 'OK')
      .click();
    
    cy.getByDataCy('logout')
      .click();
    
    cy.getByDataCy('sign_in')
      .click();
    
    cy.getByDataCy('email-sign-in')
      .type(`new_${email}`);
    
    cy.getByDataCy('password-sign-in')
      .type(password);
    
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.contains('a', username)
      .should('exist');
  });

  it('should provide an ability to update password', () => {
    const { username, email, password } = generateUser();
    cy.login(username, email, password);

    cy.visit('/#/settings')
    
    cy.getByDataCy('password')
      .type(`new_${password}`);
    
    cy.getByDataCy('update')
      .click();
    
    cy.contains('div', 'Update successful!')
      .should('exist');
        
    cy.contains('button', 'OK')
      .click();
    
    cy.getByDataCy('logout')
      .click();
    
    cy.getByDataCy('sign_in')
      .click();
    
    cy.getByDataCy('email-sign-in')
      .type(email);
    
    cy.getByDataCy('password-sign-in')
      .type(`new_${password}`);
    
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.contains('a', username)
      .should('exist');
  });

  it('should provide an ability to log out', () => {
    const { username, email, password } = generateUser();
    cy.login(username, email, password);
    
    cy.visit('/#/settings')
    
    cy.getByDataCy('logout')
      .click();
    
    cy.url()
    .should('eql', 'http://localhost:1667/#/')
    
    cy.contains('a', 'Sign in')
      .should('exist');
    
    cy.contains('a', 'Sign up')
      .should('exist');
  });
});
