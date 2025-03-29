/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const update = ' - updated';
const successful = 'Update successful!';

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
    settingsPage.clickSettingsLink();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(update);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username + update);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful(successful);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail('Edit');
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful(successful);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword('NewPassword123!"£');
    settingsPage.clickUpdateBtn();
    settingsPage.updatesWasSuccessful(successful);
  });
});
