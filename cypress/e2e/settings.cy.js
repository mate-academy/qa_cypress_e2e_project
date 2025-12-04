/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  before(() => {
    // Регистрируем и логиним тестового пользователя
    cy.registerAndLogin('testuser', 'testuser@example.com', 'password123');
  });

  beforeEach(() => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    cy.get('[data-qa=username-input]').clear().type('newusername');
    cy.get('[data-qa=update-settings]').click();
    cy.contains('Settings updated successfully').should('exist');
  });

  it('should provide an ability to update bio', () => {
    cy.get('[data-qa=bio-input]').clear().type('This is my new bio');
    cy.get('[data-qa=update-settings]').click();
    cy.contains('Settings updated successfully').should('exist');
  });

  it('should provide an ability to update an email', () => {
    cy.get('[data-qa=email-input]').clear().type('newemail@example.com');
    cy.get('[data-qa=update-settings]').click();
    cy.contains('Settings updated successfully').should('exist');
  });

  it('should provide an ability to update password', () => {
    cy.get('[data-qa=password-input]').clear().type('newpassword123');
    cy.get('[data-qa=update-settings]').click();
    cy.contains('Settings updated successfully').should('exist');
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-qa=logout]').click();
    cy.url().should('include', '/login');
  });
});
