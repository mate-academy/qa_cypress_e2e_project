/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const faker = require('faker');
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const newUsername = faker.random.word();
  const newPassword = 'Q' + faker.random.alphaNumeric(8);
  const newBio = faker.random.words(3);
  const newEmail = faker.internet.email();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.visit('/#/settings');
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulUpdateModal();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulUpdateModal();
    cy.contains('.swal-button.swal-button--confirm', 'OK')
      .click();
    cy.contains('a', user.username)
      .click();
    profilePage.assertProfileBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulUpdateModal();
    cy.contains('.swal-button.swal-button--confirm', 'OK')
      .click();
    cy.clearCookies();
    settingsPage.clickLogOutBtn();
    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulUpdateModal();
    cy.contains('.swal-button.swal-button--confirm', 'OK')
      .click();
    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
