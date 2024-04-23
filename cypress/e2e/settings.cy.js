/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser').then((generatedUser1) => {
      newUser = generatedUser1;
    });
    cy.task('generateUser').then((generatedUser2) => {
      user = generatedUser2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.loginAndRegister(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(newUser.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUser.username);
    settingsPage.clickUpdateBtn();
    homePage.usernameLink.click();
    settingsPage.clickOkBtn();
    profilePage.assertContainBio(newUser.username);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUser.email);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.clickLogoutBtn();
    cy.login(newUser.email, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUser.password);
    settingsPage.clickUpdateBtn();
    settingsPage.clickLogoutBtn();
    cy.login(user.email, newUser.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.checkNotAuthorized();
  });
});
