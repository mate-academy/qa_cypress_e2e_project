/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.settingsUsernameField
      .clear()
      .type(user.username);
    settingsPage.settingsUpdateBtn.click();

    cy.getBySwalTitle('Update successful!');
    cy.sweetAlertConfirmBtn('OK');

    homePage.usernameLink
      .should('contain', user.username);
  });

  const userBio = 'testbio';

  it('should provide an ability to update bio', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.settingsBioField
      .clear()
      .type(userBio);
    settingsPage.settingsUpdateBtn.click();

    cy.getBySwalTitle('Update successful!');
    cy.sweetAlertConfirmBtn('OK');

    settingsPage.assertUpdateUserInfo(settingsPage.settingsBioField, userBio);
  });

  it.skip('should provide an ability to update an email', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.settingsEmailField
      .clear()
      .type(user.email);
    settingsPage.settingsUpdateBtn.click();

    cy.getBySwalTitle('Update successful!');
    cy.sweetAlertConfirmBtn('OK');

    settingsPage.assertUpdateUserInfo(settingsPage.settingsEmailField, user.email);
  });

  it('should provide an ability to update password', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.settingsPasswordField
      .clear()
      .type(user.password);
    settingsPage.settingsUpdateBtn.click();

    cy.getBySwalTitle('Update successful!');
    cy.sweetAlertConfirmBtn('OK');

    settingsPage.settingsLogoutBtn.click();

    signInPage.visit();
    signInPage.emailField
      .type('riot@qa.team');
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', 'riot');
  });

  it('should provide an ability to log out', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.settingsLogoutBtn.click();

    cy.assertUrl('/#/');
  });
});
