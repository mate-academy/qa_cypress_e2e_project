import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
const faker = require('faker');

/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new SettingsPageObject;
const homePage = new HomePageObject;
const signInPage = new SignInPageObject;
const newUserData = {
  username: faker.name.firstName(),
  bio: faker.lorem.words(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillUsernameSettingsField(newUserData.username);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSettingsUpdated();
    settingsPage.clickOnModalOkBtn();
    homePage.assertUsernameLink(newUserData.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillBioSettingsField(newUserData.bio);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSettingsUpdated();
    settingsPage.clickOnModalOkBtn();
    settingsPage.assertBioSettingsValue(newUserData.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillEmailSettingsField(newUserData.email);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSettingsUpdated();
    settingsPage.clickOnModalOkBtn();
    signInPage.signInWithUpdatedCredentials(newUserData.email, user.password)
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillPasswordSettingsField(newUserData.password);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSettingsUpdated();
    settingsPage.clickOnModalOkBtn();
    signInPage.signInWithUpdatedCredentials(user.email, newUserData.password);
    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();
    homePage.assertLogOutHomePage();
  });
});

