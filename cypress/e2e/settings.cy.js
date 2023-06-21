/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

const testData = {
  newUsername: faker.lorem.word(),
  newBio: faker.lorem.sentence(),
  newEmail: faker.internet.email(),
  newPassword: '!qweR1234'
}

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.editUsername
      .type('{selectAll}' + testData.newUsername);
    settingsPage.updateSettingsBtn
      .click();
    settingsPage.modal
      .click();

    cy.visit(`/#/@${testData.newUsername}`);
    settingsPage.assertUsername
      .should('include', `${testData.newUsername}`);
  });

  it('should provide an ability to update bio', () => {
  
  settingsPage.editBio
    .type('{selectAll}' + testData.newBio);
  settingsPage.updateSettingsBtn
    .click();
  settingsPage.modal
    .click();

  settingsPage.visit();
  settingsPage.assertNewBio
    .should('have.value', `${testData.newBio}`);
  });

  it('should provide an ability to update an email', () => {

  settingsPage.editEmail
    .type('{selectAll}' + testData.newEmail);
  settingsPage.updateSettingsBtn
    .click();
  settingsPage.modal
    .click();
  settingsPage.logoutBtn
    .click();

  settingsPage.assertNewSignInCredentials(testData.newEmail, user.password);
  cy.visit(`/#/@${testData.newUsername}`);
  settingsPage.assertUsername
  .should('include', `${testData.newUsername}`);
  });

  it('should provide an ability to update password', () => {

  settingsPage.editPassword
    .type('{selectAll}' + testData.newPassword);
  settingsPage.updateSettingsBtn
    .click();
  settingsPage.modal
    .click();
  settingsPage.logoutBtn
    .click();

  settingsPage.assertNewSignInCredentials(user.email, testData.newPassword);
  cy.visit(`/#/@${testData.newUsername}`);
  settingsPage.assertUsername
  .should('include', `${testData.newUsername}`);

  });

  it('should provide an ability to log out', () => {
    
    settingsPage.logoutBtn
    .click();

    settingsPage.assertLogout();
  });
});
