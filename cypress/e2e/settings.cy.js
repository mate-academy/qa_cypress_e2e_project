/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const userPage = new ProfilePageObject();
const faker = require('faker');

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.login();
  });

  it('should provide an ability to update username', () => {
    const updateUsername = faker.lorem.word();

    settingsPage.visit();
    settingsPage.editUsername.clear();
    settingsPage.typeEditUsername(updateUsername);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(updateUsername);
  });

  it('should provide an ability to update bio', () => {
    const newArticleBio = faker.lorem.words();

    settingsPage.visit();
    settingsPage.editBio.type(newArticleBio);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.visit('/#/@riot/');
    userPage.updateBio.should('include', newArticleBio);
  });

  it('should provide an ability to update an email', () => {
    const updateEmail = faker.internet.email();

    settingsPage.visit();
    settingsPage.editEmail.clear();
    settingsPage.typeEditEmail(updateEmail);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(updateEmail);
    signInPage.passwordField.type(user.password);
    signInPage.clickSignInBtn();

    cy.wait(5000);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const updatedPassword = faker.internet.password();

    settingsPage.visit();
    settingsPage.editEmail.clear();
    settingsPage.typeEditPassword(updatedPassword);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(updatedPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.assertHomePageUrl();
  });
});
