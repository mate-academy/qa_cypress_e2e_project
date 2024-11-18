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

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      newUserName = user.username + '134';
      cy.register(user.email, user.username, user.password);
      cy.login(user);
    });

    cy.visit('/settings');
  });

  it.only('should provide an ability to update username', () => {
    settingPage.typeUserName(newUserName);
    settingPage.clickUpdateButton();
    homePage.ClickOnUsernameLinkInHeader();
    homePage.assertHeaderContainUsername(newUserName);
  });

  it.only('should provide an ability to update bio', () => {
    settingPage.typeBio(user.username);
    settingPage.clickUpdateButton();
    settingPage.visit('/profile/riot');
    profilePage.assertBioContainNewBio(user.username);
  });

  it('should provide an ability to update an email', () => {
    settingPage.typeEmail(user.email);
    settingPage.clickUpdateButton();
    settingPage.clickLogoutButton();
    settingPage.reloadPage();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  // it('should provide an ability to update password', () => {
  //   settingPage.typePassword('newPassword123');
  //   settingPage.clickUpdateButton();
  //   settingPage.clickLogoutButton();
  //   settingPage.reloadPage();
  //   signInPage.visit();
  //   signInPage.typeEmail('riot@qa.team');
  //   signInPage.typePassword('newPassword123');
  //   signInPage.clickSignInBtn();
  //   homePage.assertHeaderContainUsername('riot');
  // });

  // it('should provide an ability to log out', () => {
  //   settingPage.clickLogoutButton();
  //   homePage.assertHeaderContainH1Text('conduit');
  // });
});
