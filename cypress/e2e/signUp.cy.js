/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const settingsPage = new SettingsPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to Sign Up with valid credentials', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSuccessModal();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.assertSignedUp();
  });

  it('should not provide an ability to register without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnSuccessModal('Username');
  });

  it('should not provide an ability to register without email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnSuccessModal('Email');
  });

  it('should not provide an ability to register without password', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnSuccessModal('Password');
  });

  it(
    'should not provide an ability to Sign Up with allready exist username',
    () => {
      signUpPage.typeUserName(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();

      signUpPage.assertSuccessModal();
      homePage.assertHeaderContainUsername(user.username);
      signUpPage.assertSignedUp();

      settingsPage.visit();
      settingsPage.clickLogoutBtn();

      signUpPage.visit();
      signUpPage.typeUserName(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
      signUpPage.assertUnSuccessEmail();
    });
});
