/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import ProfilePageObject from "../support/pages/profile.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const bio = 'New bio information';
  const updatedEmail = 'inna@qa.team';
  const updatedPassword = 'Inna1234!';
  const email = 'riot@qa.team';
  const username = 'riot';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should update username', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.updateUsername(user.username);
    settingsPage.verifySuccessfulUpdating();
    homePage.assertHeaderContainUsername(user.username);
    homePage.clickUsernameLink();
    profilePage.accertUsername(user.username);
  });

  it('should update bio', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.updateBio(bio);
    settingsPage.verifySuccessfulUpdating();
    homePage.clickUsernameLink();
    profilePage.accertNewBio(bio);
  });

  it('should update an email', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.updateEmail(updatedEmail);
    settingsPage.verifySuccessfulUpdating();
    settingsPage.clickLogoutBtn();
    signInPage.loginWithUpdatedData(updatedEmail, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should update password', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.updatePassword(updatedPassword);
    settingsPage.verifySuccessfulUpdating();
    settingsPage.clickLogoutBtn();
    signInPage.loginWithUpdatedData(email, updatedPassword);
    homePage.assertHeaderContainUsername(username);
  });

  it('should log out', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.checkUrl();
  });
});
