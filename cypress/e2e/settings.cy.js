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

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clickSettingsLink();
    settingsPage.updateUsername(' - update');
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username + ' - update');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clickSettingsLink();
    settingsPage.updateBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clickSettingsLink();
    settingsPage.updateEmail('Edit');
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickSettingsLink();
    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.clickSettingsLink();
    settingsPage.updatePassword('NewPassword123!"£');
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful('Update successful!');
  });
});
