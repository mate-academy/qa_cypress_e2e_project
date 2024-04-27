/// <reference types='cypress' />
/// <reference types='../support' />

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
  let newUser;

  before(() => {
    cy.task('generateUser')
      .then((generatedUser1) => {
        newUser = generatedUser1;
      });

    cy.task('generateUser')
      .then((generatedUser2) => {
        user = generatedUser2;
      });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.loginAndRegister(
      user.email,
      user.username,
      user.password);

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage
      .typeUserName(newUser.username);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    homePage
      .assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage
      .typeBio(newUser.username);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    homePage.usernameLink
      .click();

    profilePage
      .assertBio(newUser.username);
  });

  it('should provide an ability to update an email', () => {
    settingsPage
      .typeEmail(newUser.email);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    settingsPage
      .clickLogoutBtn();

    cy.login(user.email, user.password);
  });

  it('should provide an ability to update password', () => {
    settingsPage
      .typePassword(newUser.newPassword);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    settingsPage
      .clickLogoutBtn();

    signInPage.visit();

    signInPage
      .typeEmail(user.email);

    signInPage
      .typePassword(newUser.newPassword);

    signInPage
      .clickSignInBtn();

    homePage.usernameLink
      .click();

    homePage
      .assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage
      .clickLogoutBtn();

    homePage
      .checkNotAuthorized();
  });
});
