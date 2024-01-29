/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import PageObject from '../support/PageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const pageObject = new PageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.newUsername);
    settingsPage.clickUpdateSettingsButton();

    pageObject.assertSuccessWindow('Update successful!');
    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettingsButton();

    pageObject.assertSuccessWindow('Update successful!');

    pageObject.clickOkButton();

    settingsPage.assertBioUpdate(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.newEmail);
    settingsPage.clickUpdateSettingsButton();

    pageObject.assertSuccessWindow('Update successful!');

    pageObject.clickOkButton();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(user.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    // settingsPage.emailField.should('contain', user.newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.newPassword);
    settingsPage.clickUpdateSettingsButton();

    pageObject.assertSuccessWindow('Update successful!');

    pageObject.clickOkButton();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
