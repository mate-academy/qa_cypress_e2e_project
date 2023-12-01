/// <reference types='cypress' />
/// <reference types='../support' />

import { SettingsPageObject } from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.register(user.username, user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.anotherUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMessage();
    settingsPage.assertUpdatedUsername();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMessage();
    settingsPage.assertUpdatedBio();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeUpdateEmail(user.anotherEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMessage();
    settingsPage.assertUpdatedEmail();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.anotherPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMessage();
  });
});
