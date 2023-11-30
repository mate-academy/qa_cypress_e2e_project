/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const successfulMessage = 'Update successful!';

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
    const newUsername = faker.name.firstName();

    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalText(successfulMessage);
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words();

    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalText(successfulMessage);
    settingsPage.assertBioField(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalText(successfulMessage);
    settingsPage.assertEmailField(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Zxcvb1234!';

    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalText(successfulMessage);
    settingsPage.clickOnLogOutBtn();
    homePage.clickLogInBtn();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();
    homePage.assertUserIsNotLoggedIn();
  });
});
