/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import faker from 'faker';
import ProfilePageObject from '../support/pages/profile.pageObject';
const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
  settingsPage.visit();
  });
});

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.lines(1);

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();
    homePage.clickUsernameLink();
    profilePage.assertProfileInfo(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertEmailField(newEmail);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();
    cy.clearCookies();
    cy.wait(2000);
    cy.get('.swal-button')
    .click();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
