/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePage from '../support/pages/profile.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import HomePage from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';

const faker = require('faker');

const profilePage = new ProfilePage();
const settingsPage = new SettingsPage();
const homePage = new HomePage();
const signInPage = new SignInPage();

describe('Settings page', () => {
  let user;
  let newUser;
  const newBio = faker.lorem.words();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeNewUsername(newUser.username);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();

    settingsPage.assertUpdatedUsernameField(newUser.username);
    homePage.assertHeaderContainUsername(newUser.username);
    profilePage.visit(newUser.username);
    profilePage.assertProfileInLink(newUser.username);
    profilePage.assertUpdatedProfileInfo(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeNewBio(newBio);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();
    settingsPage.assertUpdatedBioField(newBio);
    profilePage.visit(user.username);
    profilePage.assertUpdatedProfileInfo(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeNewEmail(newUser.email);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();
    settingsPage.assertUpdatedEmailField(newUser.email);
    settingsPage.clickOnLogoutBtn();
    signInPage.login(newUser.email, user.password);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typeNewPassword(newUser.password);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();
    signInPage.visit();
    signInPage.login(user.email, newUser.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    homePage.assertHeaderNotContainUsername();
    homePage.assertHeaderContainSignIn();
    homePage.assertUrlAfterLogout();
  });
});
