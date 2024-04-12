/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signIn = new SignInPageObject();
const { faker } = require('@faker-js/faker');

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName().toLowerCase();
    settingsPage.typeUserName(newUsername);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateButton();
    settingsPage.assertBioField(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateButton();
    settingsPage.acceptModalWindow();
    settingsPage.assertEmailField(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateButton();
    settingsPage.acceptModalWindow();
    settingsPage.visit();
    settingsPage.clickLogOutButton();
    signIn.visit();
    signIn.typeEmail(user.email);
    signIn.typePassword(newPassword);
    signIn.clickSignInButton();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutButton();
    homePage.assertHomePageUrl();
  });
});
