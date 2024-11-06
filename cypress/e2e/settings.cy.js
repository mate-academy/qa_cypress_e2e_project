/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import UserSettings from '../support/pages/userSettings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const userSettings = new UserSettings();

describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('db:clear');
      signUpPage.visit();
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
      signUpPage.clickOkBtn();

      userSettings.visit();
    });
  });

  it('should provide an ability to update username', () => {
    userSettings.typeUsername('username');
    userSettings.clickUpdateSettingsBtn();
    signUpPage.clickOkBtn();
    homePage.assertHeaderContainUsername('username');
  });

  it('should provide an ability to update bio', () => {
    userSettings.typeBio(user.bio);
    userSettings.clickUpdateSettingsBtn();
    signUpPage.clickOkBtn();
    homePage.visit();
    userSettings.visit();
    userSettings.assertBioUpdated(user.bio);
  });

  it('should provide an ability to update an email', () => {
    userSettings.typeEmail('sofiia06@gmail.com');
    userSettings.clickUpdateSettingsBtn();
    signUpPage.clickOkBtn();
    userSettings.visit();
    userSettings.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail('sofiia06@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    userSettings.typePassword('Password1!');
    userSettings.clickUpdateSettingsBtn();
    signUpPage.clickOkBtn();
    userSettings.visit();
    userSettings.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('Password1!');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    userSettings.clickLogoutBtn();
  });
});
