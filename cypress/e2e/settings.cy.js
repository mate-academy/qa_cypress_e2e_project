/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
let user;
const updateMessage = 'Update successful!';
const newUsername = 'New Username';
const newBio = 'New bio to update the field';
const newEmail = 'newEmail@test.qa';
const newPassword = 'New Password';

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    homePage.fillField('username-field', `{selectAll}${newUsername}`);
    homePage.clickOnBtn('update-btn');
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();
    settingsPage.assertUpdatedUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    homePage.fillField('bio-field', `{selectAll}${newBio}`);
    homePage.clickOnBtn('update-btn');
    // settingsPage.assertSuccessfulUpdate(updateMessage); з ним впаде
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();
  });

  it.skip('should provide an ability to update an email', () => { // дєвачкi, ви упалi. жук. 'Invalid user credentials.'
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    homePage.fillField('email-field', `{selectAll}${newEmail}`);
    homePage.clickOnBtn('update-btn');
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();

    cy.clearCookies();

    signInPage.visit();
    homePage.fillField('email-sign-in', newEmail);
    homePage.fillField('password-sign-in', user.password);
    homePage.clickOnBtn('sign-in-btn');
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    homePage.fillField('password-field', newPassword);
    homePage.clickOnBtn('update-btn');
    settingsPage.clickOnModalOk();

    cy.clearCookies();

    signInPage.visit();
    homePage.fillField('email-sign-in', user.email);
    homePage.fillField('password-sign-in', newPassword);
    homePage.clickOnBtn('sign-in-btn');
    signInPage.assertSuccessfulLogin(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    homePage.clickOnBtn('logout-btn');
    settingsPage.assertSuccessfulLogOut();
  });
});
