/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Settings page', () => {
let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const userNewName = faker.name.firstName().toLowerCase();

    settingsPage.changeName(userNewName);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph().toLowerCase();

    settingsPage.changeBio(bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    const email = faker.internet.email().toLowerCase();

    settingsPage.changeEmail(email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated('Update successful!');
  });

  it('should provide an ability to update password', () => {
    const password = faker.internet.password();

    settingsPage.changePassword(password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertUsernameLinkDoesNotExist();
  });
});
