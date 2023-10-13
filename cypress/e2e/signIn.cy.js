/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.PageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign In page', () => {
  let user;
  let credentialsData;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('signInData').then((signInData) => {
      credentialsData = signInData;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
  });

  it('should not provide an ability to log in with empty password field', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin(credentialsData.passwordRequiredMessage);
  });

  it('should not provide an ability to log in with empty email field', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin(credentialsData.emailRequiredMessage);
  });

  it('should not provide an ability to log in with not exist email', () => {
    signInPage.typeEmail(credentialsData.notExistEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin(credentialsData.invalidCredentialsMessage);
  });

  it('should not provide an ability to log in with not exist password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(credentialsData.notExistPassword);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin(credentialsData.invalidCredentialsMessage);
  });

  it('should redirect to sign up page', () => {
    signInPage.clickNeedAccountLink();
    signInPage.checkUrl('register');
    signUpPage.checkSignUpText();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
});
