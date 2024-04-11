/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/settings.PageObject';
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let updatedUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('updateSettings').then((updateSettings) => {
      updatedUser = updateSettings;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateUsername(updatedUser.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.assertUpdatedUsername(updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateBio(updatedUser.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdateSuccessful();
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateEmail(updatedUser.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.assertSuccessfullLoginWithNewEmail(updatedUser.email, user.password, user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updatePassword(updatedUser.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.assertSuccessfullLoginWithNewPassword(user.email, updatedUser.password);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    settingsPage.assertSuccessfulLogout();
  });
});
