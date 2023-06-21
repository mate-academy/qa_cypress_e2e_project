/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const faker = require('faker');
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  const userChanged = {
    username: faker.name.firstName(),
    bio: faker.lorem.words(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const successUpdate = 'Update successful!';

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.login(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsernameField(userChanged.username);
    settingsPage.clickUpdateSetBtn();
    settingsPage.assertSuccessfulUpdate(successUpdate);
    settingsPage.clickOnModalOkBtn();

    homePage.assertUsername(userChanged.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBioField(userChanged.bio);
    settingsPage.clickUpdateSetBtn();
    settingsPage.assertSuccessfulUpdate(successUpdate);
    settingsPage.clickOnModalOkBtn();

    settingsPage.assertBio(userChanged.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.updateEmailField(userChanged.email);
    settingsPage.clickUpdateSetBtn();
    settingsPage.assertSuccessfulUpdate(successUpdate);
    settingsPage.clickOnModalOkBtn();

    signInPage.submitSignInForm(userChanged.email, user.password);
    homePage.assertUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePasswordField(userChanged.password);
    settingsPage.clickUpdateSetBtn();
    settingsPage.assertSuccessfulUpdate(successUpdate);
    settingsPage.clickOnModalOkBtn();

    signInPage.submitSignInForm(user.email, userChanged.password);
    homePage.assertUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogOutBtn();

    homePage.assertLogOUtHomePage();
  });
});
