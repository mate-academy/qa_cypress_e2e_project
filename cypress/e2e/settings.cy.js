/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
    cy.task('generateNewUser').then((generateNewUser) => {
      newUser = generateNewUser;
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUser.username);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
    settingsPage.clickOnSuccessfulButton();
    settingsPage.usernameLink.should('contain', newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUser.bio);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
    settingsPage.clickOnSuccessfulButton();
    settingsPage.clickOnUsernameLink();
    settingsPage.paragraph.should('contain', newUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUser.email);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
    settingsPage.clickOnSuccessfulButton();
    settingsPage.emailField.should('contain', newUser.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUser.password);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
    settingsPage.clickOnSuccessfulButton();
    settingsPage.clickOnLogoutButton();
    settingsPage.visit('/#/login');
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUser.password);
    signInPage.clickSignInBtn();
    settingsPage.usernameLink.should('exist');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutButton();
    homePage.usernameLink.should('not.exist');
  });
});
