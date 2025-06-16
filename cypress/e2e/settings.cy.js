/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((u) => {
      user = u;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/#/settings');
  });

  it('should provide an ability to update username', () => {
    cy.get('[data-qa="username-input"]').clear().type('new_user');
    cy.get('[data-qa="password-input"]').type(user.password);
    cy.get('[data-qa="submit-btn"]').click();
  });

  it('should provide an ability to update bio', () => {
    cy.get('[data-qa="bio-textarea"]').clear().type('My new bio');
    cy.get('[data-qa="password-input"]').type(user.password);
    cy.get('[data-qa="submit-btn"]').click();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = `new_${Date.now()}@test.com`;
    cy.get('[data-qa="email-input"]').clear().type(newEmail);
    cy.get('[data-qa="password-input"]').type(user.password);
    cy.get('[data-qa="submit-btn"]').click();
  });

  it('should provide an ability to update password', () => {
    cy.get('[data-qa="password-input"]').type('NewPass123!');
    cy.get('[data-qa="submit-btn"]').click();
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-qa="logout-btn"]').click();
    cy.contains('a', 'Sign in').should('be.visible');
  });
});
