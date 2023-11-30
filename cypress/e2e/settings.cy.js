/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require("faker");

import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName();

    settingsPage.changeName(newUsername.toLowerCase());
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(newUsername.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.random.words();

    settingsPage.changeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.changeEmail(newEmail.toLowerCase());
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(newEmail.toLowerCase());
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Pas$word1!';

    settingsPage.changePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.verifySettingsWasUpdated();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertUserIsNotLoggedIn();
  });
});
