/// <reference types="cypress" />
/// <reference types="../support" />

import { generateNewUser } from '../support/generateNewUser';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });

    cy.login(user)
    cy.visit('/#/settings');
  });

  const message = 'Update successful!'

  it('should provide an ability to update username', () => {
    cy.get('[data-qa="username-field-settings"]')
      .type('newUserName');
    cy.get('[data-qa="update-btn"]')
      .click();
    cy.contains('.swal-modal', message)
      .should('exist');
    cy.get('.swal-button')
      .click();
  });

  it('should provide an ability to update bio', () => {
    cy.get('[data-qa="bio-field-settings"]')
      .type('New bio info')
    cy.get('[data-qa="update-btn"]')
      .click();
    cy.contains('.swal-modal', message)
      .should('exist');
    cy.get('.swal-button')
      .click();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newemail123@gmail.com';

    cy.get('[data-qa="email-field-settings"]')
      .clear();
    cy.get('[data-qa="email-field-settings"]')
      .type(newEmail);
    cy.get('[data-qa="update-btn"]')
      .click();
    cy.contains('.swal-modal', message)
      .should('exist');
    cy.get('.swal-button')
      .click();
    cy.get('[data-qa="email-field-settings"]')
      .should('contain', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Diablo4!'

    cy.get('[data-qa="password-field-settings"]')
      .type(newPassword);
      cy.get('[data-qa="update-btn"]')
      .click();
    cy.contains('.swal-modal', message)
      .should('exist');
    cy.get('.swal-button')
      .click();
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-qa="logout-btn"]')
      .click();
    cy.url()
      .should('equal', 'http://localhost:1667/#/');
    cy.getByDataQa('username-link').should('not.exist');
  });
});
