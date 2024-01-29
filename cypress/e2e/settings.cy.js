/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/setting.pageObject";
import HomePageObject from '../support/pages/home.pageObject';
import PageObject from '../support/PageObject';
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();
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
    settingsPage.clickOnUpdateSettingsButton();

    pageObject.assertSuccessfulWindow('Update successful!');
    pageObject.clickOnOkWindowBtn();
    homePage.assertHeaderContainUsername(user.newUsername);

  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnUpdateSettingsButton();

    pageObject.assertSuccessfulWindow('Update successful!');
    pageObject.clickOnOkWindowBtn();
    settingsPage.assertUserBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.newEmail);
    settingsPage.clickOnUpdateSettingsButton();

    pageObject.assertSuccessfulWindow('Update successful!');
    pageObject.clickOnOkWindowBtn();
    settingsPage.assertUserEmail(user.newEmail);
  });

  it('should provide an ability to update password', () => { 
    settingsPage.typePassword(user.newPassword);
    settingsPage.clickOnUpdateSettingsButton();

    pageObject.assertSuccessfulWindow('Update successful!');
    pageObject.clickOnOkWindowBtn();
    settingsPage.clickOnLogoutButton();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    pageObject.assertErrorWindow('Invalid user credentials.');

  });
});
