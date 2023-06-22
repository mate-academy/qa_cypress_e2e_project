/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!',
};

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
  cy.task('db:clear');
  cy.wait(100);
  cy.register(user.email, user.username, user.password);
  homePage.loggedUser(user.email, user.password);
  settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickSubmitButton();
    settingsPage.assertUpdate('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateUsername(user.bio);
    settingsPage.clickSubmitButton();
    settingsPage.assertUpdate('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(userData.email);
    settingsPage.clickSubmitButton();
    settingsPage.assertUpdate('Update successful!');
    settingsPage.successfulLoginWithNewEmail(
      userData.email,
      user.password
    );
    homePage.assertUsernameLink(userData.username);
  
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePassword('Password123!');
    settingsPage.clickSubmitButton();
    settingsPage.assertUpdate('Update successful!');
    settingsPage.successfulLoginWithNewPassword(
      user.email,
      'Password123!'
    );
    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickSettingsLink();
    settingsPage.clickLogOut();
    settingsPage.assertLogOut();
  });
});
