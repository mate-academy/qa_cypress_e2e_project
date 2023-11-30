/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const message = {
    successfulUpdate: 'Update successful!'
  };
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password);
      settingsPage.visit();

    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertMessage(message.successfulUpdate);
    homePage.clickOkBtn();
    settingsPage.assertUpdatedUsername(newUsername);
    homePage.assertHeaderContainUsername(newUsername);
    homePage.clickUsernameLink();
    profilePage.assertUserInfo(newUsername);

  });

  it('should provide an ability to update bio', () => {
    const newbio = faker.lorem.words();
    settingsPage.fillBioField(newbio);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertMessage(message.successfulUpdate);
    homePage.clickOkBtn();
    settingsPage.assertUpdatedBio(newbio);
    homePage.clickUsernameLink();
    profilePage.assertUserInfo(newbio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertMessage(message.successfulUpdate);
    homePage.clickOkBtn();
    settingsPage.assertUpdatedEmail(newEmail);

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'sdAs789*5';
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertMessage(message.successfulUpdate);
    homePage.clickOkBtn();
    
    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
