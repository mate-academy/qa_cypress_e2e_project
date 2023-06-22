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

  beforeEach(() => {
    homePage.clearDatabase();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    homePage.loggedUser();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickSubmitButton();

    settingsPage.assertUpdate('Update successful!');
    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickSubmitButton();

    settingsPage.assertUpdate('Update successful!');
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.clickSubmitButton();

    settingsPage.assertUpdate('Update successful!');
    settingsPage.successfulLoginWithNewEmail(
      user.email,
      userData.password
    );
    homePage.assertUsernameLink(userData.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.clickSubmitButton();

    settingsPage.assertUpdate('Update successful!');
    settingsPage.successfulLoginWithNewPassword(
      userData.email,
      user.password
    );
    homePage.assertUsernameLink(userData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickSettingsLink();
    settingsPage.clickLogOut();
    settingsPage.assertLogOut();
  });
});
