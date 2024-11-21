/// <reference types='cypress' />
/// <reference types='../support' />

import SettingPageObject from '../support/pages/setting.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingPage = new SettingPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUserName;
  let newEmail;
  let newPassword;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      newUserName = user.username + '134';
      newEmail = 'new' + user.email;
      newPassword = 'new' + user.password;
      cy.register(user.email, user.username, user.password);
      cy.login(user);
    });

    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    settingPage.typeUserName(newUserName);
    settingPage.clickUpdateButton();
    homePage.clickOnUsernameLinkInHeader();
    homePage.assertHeaderContainUsername(newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingPage.typeBio(user.username);
    settingPage.clickUpdateButton();
    homePage.clickOnUsernameLinkInHeader();
    profilePage.assertBioContainNewBio(user.username);
  });

  it('should provide an ability to update an email', () => {
    settingPage.typeEmail(newEmail);
    settingPage.clickUpdateButton();
    settingPage.clickLogoutButton();
    signInPage.visit('user/login');
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingPage.typePassword(newPassword);
    settingPage.clickUpdateButton();
    settingPage.clickLogoutButton();
    signInPage.visit('user/login');
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingPage.clickLogoutButton();
    homePage.assertHeaderContainH1Text('conduit');
  });
});
