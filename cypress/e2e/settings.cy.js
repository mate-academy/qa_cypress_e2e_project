/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPage from '../support/pages/settings.pageObject.js';
import PageObject from '../support/pages/PageObject.js';

describe('User Settings Functionality', () => {
  const commonPage = new PageObject();
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.registerAndLogin().then((loggedInUser) => {
      user = loggedInUser;
    });
    SettingsPage.visit();
  });

  it('should allow a user to update their bio', () => {
    const newBio = faker.lorem.sentence(5);

    SettingsPage.getBioTextarea().clear().type(newBio);
    SettingsPage.submitSettingsForm();

    cy.contains('Update successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();

    commonPage.getProfileLink().click();
    cy.get('[data-qa="profile-bio"]').should('contain', newBio);
  });

  it('should allow a user to update their username', () => {
    const newUsername = faker.internet.userName();

    SettingsPage.getUsernameInput().clear().type(newUsername);
    SettingsPage.submitSettingsForm();

    cy.contains('Update successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();

    commonPage.getProfileLink().should('contain', newUsername);
    commonPage.getProfileLink().click();
    cy.get('[data-qa="profile-username"]').should('contain', newUsername);
  });

  it('should allow a user to update their email', () => {
    const newEmail = faker.internet.email();

    SettingsPage.getEmailInput().clear().type(newEmail);
    SettingsPage.submitSettingsForm();

    cy.contains('Update successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();

    SettingsPage.getLogoutButton().click();
    cy.url().should('include', '/');

    cy.clearCookies();
    cy.visit('/#/login');
    cy.get('[data-qa="login-page"]').should('be.visible');
    cy.get('[data-qa="email-input"]').type(newEmail);
    cy.get('[data-qa="password-input"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();

    cy.url().should('not.include', '/login');
    commonPage.getProfileLink().should('contain', user.username);
  });

  it('should allow a user to update their password', () => {
    const newPassword = 'NewPassword123!';

    SettingsPage.getPasswordInput().clear().type(newPassword);
    SettingsPage.submitSettingsForm();

    cy.contains('Update successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();

    SettingsPage.getLogoutButton().click();
    cy.url().should('include', '/');

    cy.clearCookies();
    cy.visit('/#/login');
    cy.get('[data-qa="login-page"]').should('be.visible');
    cy.get('[data-qa="email-input"]').type(user.email);
    cy.get('[data-qa="password-input"]').type(newPassword);
    cy.get('[data-qa="login-button"]').click();

    cy.url().should('not.include', '/login');
    commonPage.getProfileLink().should('contain', user.username);
  });

  it('should not allow a user to update with an existing email', () => {
    const anotherUsername = faker.internet.userName();
    const anotherEmail = faker.internet.email();
    const anotherPassword = 'Password456!';

    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        username: anotherUsername,
        email: anotherEmail,
        password: anotherPassword
      }
    });

    SettingsPage.visit();

    SettingsPage.getEmailInput().clear().type(anotherEmail);
    SettingsPage.submitSettingsForm();

    cy.get('.swal-title').should('be.visible')
      .and('contain', 'Update failed');
    cy.url().should('include', '/settings');
  });
});
