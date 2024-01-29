/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const faker = require('faker');

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  const signInPageObject = new SignInPageObject();
  let user;
  const newUsername = faker.name.firstName().toLowerCase();
  const bio = faker.name.firstName();
  const newEmail = faker.name.firstName().toLowerCase() + '@gmail.com';
  const newPassword = 'qawsedQ123!';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUsernameField(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
    settingsPage.clickOnModal();
    settingsPage.clickOnConfirmUpdateButton();
    settingsPage.assertNewUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillBioField(bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
    settingsPage.clickOnModal();
    settingsPage.clickOnConfirmUpdateButton();
    settingsPage.assertUpdatedBio(bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
    settingsPage.clickOnModal();
    settingsPage.clickOnConfirmUpdateButton();
    settingsPage.assertUpdateEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
    settingsPage.clickOnModal();
    settingsPage.clickOnConfirmUpdateButton();
    cy.clearCookies();
    signInPageObject.visit();
    signInPageObject.typeEmail(user.email);
    signInPageObject.typeNewPassword(newPassword);
    signInPageObject.clickSignInBtn();
    settingsPage.assertUrlChanged();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogoutButton();
    settingsPage.assertLogout();
  });
});
