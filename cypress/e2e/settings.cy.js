/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let updateUser;
  before(() => {
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      updateUser = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateUsername(updateUser.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfulWindow();
    settingsPage.assertUpdatedUsername(updateUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateBio(updateUser.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfulWindow();
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateEmail(updateUser.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfulWindow();
    settingsPage.assertUpdatedEmail(updateUser.email);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updatePassword(updateUser.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfulWindow();
    settingsPage.assertUpdatedPassword(updateUser.password);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutBtn();
    settingsPage.assertSuccessfulLogout();
  });
});
