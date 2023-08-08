/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const faker = require('faker');

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user);
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();

    settingsPage.clearUsername();
    settingsPage.typeUsername(faker.internet.userName());
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.isSettingsUpdated();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();

    settingsPage.typeBio(faker.lorem.word());
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.isSettingsUpdated();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();

    settingsPage.clearEmail();
    settingsPage.typeEmail(faker.internet.email());
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.isSettingsUpdated();
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();

    settingsPage.typePassword(faker.internet.password());
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.isSettingsUpdated();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();

    settingsPage.clickLogoutBtn();
  });
});
