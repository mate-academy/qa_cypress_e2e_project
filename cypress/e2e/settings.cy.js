/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const homePage = new HomePageObject();
  const settingsPage = new SettingsPageObject();
  let user;
  let settings;
  const VALID_PASSWORD = 'P@sswOrd1';

  before(() => {
    return cy
      .task('generateUser')
      .then((generateUser) => {
        user = generateUser;
        return cy.register(user.email, user.username, user.password);
      })
      .then(() => {
        return cy.task('generateSettings');
      })
      .then((generateSettings) => {
        settings = generateSettings;
      });
  });

  beforeEach(() => {
    homePage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(settings.username);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessMessageContains('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(settings.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessMessageContains('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear();
    settingsPage.typeEmail(settings.email);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessMessageContains('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    cy.url().should('not.include', 'settings');
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(VALID_PASSWORD);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessMessageContains('Update successful!');
  });
});
