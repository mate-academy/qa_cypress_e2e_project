/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';

const faker = require('faker');
const settingsPage = new SettingsPageObject();

const userData = {
  username: faker.name.firstName().toLowerCase(),
  userBio: 'I am a QA Engineer',
  email: faker.internet.email(),
  password: faker.internet.password()
};

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.register();
  });

  beforeEach(() => {
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField
      .clear()
      .type(userData.username);
    settingsPage.updateBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Update successful!');
    });
    settingsPage.usernameField
      .should('have.value', userData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.userBioField
      .clear()
      .type(userData.userBio);
    settingsPage.updateBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Update successful!');
    });
    settingsPage.userBioField
      .should('have.value', userData.userBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField
      .clear()
      .type(userData.email);
    settingsPage.updateBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Update successful!');
    });
    settingsPage.emailField
      .should('have.value', userData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField
      .type(userData.password);
    settingsPage.updateBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Update successful!');
    });

    cy.clearCookies();
    cy.reload();

    signInPage.visit();
    cy.login();
    cy.get('.nav-link')
      .should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn
      .click();
    cy.getCookies('drash_sess')
      .should('have.property', 'value', 'null');
    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
