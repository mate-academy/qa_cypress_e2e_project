/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const fakeData = SettingsPageObject.generateFakeData();

describe('Settings page', () => {
  beforeEach(() => {
    cy.setupUserSession(homePage);
  });

  it('should provide an ability to update username', () => {
    homePage.clickSettingsBtn();
    const newUsername = fakeData.username;
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
  });

  it('should provide an ability to update bio', () => {
    homePage.clickSettingsBtn();
    const newBio = fakeData.bio;
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
  });

  it('should provide an ability to update an email', () => {
    homePage.clickSettingsBtn();
    const newEmail = fakeData.email;
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
  });

  it('should provide an ability to update password', () => {
    homePage.clickSettingsBtn();
    const password = fakeData.password;
    settingsPage.typePassword(password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertModal();
  });
});
