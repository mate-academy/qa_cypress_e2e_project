/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObjects";
const { faker, ne } = require('@faker-js/faker');

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let newUser;
  let bio = faker.lorem.words();
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.loginAsUser(user.email, user.username, user.password);
    });
    cy.task('generateUser').then(generateUser => {
      newUser = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();

    settingsPage.clearUsername();
    settingsPage.typeUsername(newUser.username);
    settingsPage.clickUpdateBtn();
    settingsPage.asserUpdateSuccessful();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();

    settingsPage.clearBio();
    settingsPage.typeBio(bio);
    settingsPage.clickUpdateBtn();
    settingsPage.asserUpdateSuccessful();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();

    settingsPage.clearEmail();
    settingsPage.typeEmail(newUser.email);
    settingsPage.clickUpdateBtn();
    settingsPage.asserUpdateSuccessful();
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();

    settingsPage.clearPassword();
    settingsPage.typePassword(newUser.password);
    settingsPage.clickUpdateBtn();
    settingsPage.asserUpdateSuccessful();
  });
});
