/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign In page', () => {
  let user;
  const wrongEmail = 'innaqa@gmail.com';
  const wrongPassword = 'InnaQaTest12';

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');
    
    signInPage.visit();
  });

  it('should log in with exist email and password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should redirect to the Sign Up page', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.clickNeedAccountLink();
    signInPage.checkUrl('register');
    signUpPage.checkSignUpText();
  });

  it('should not log in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin('Invalid user credentials.');
  });

  it('should not log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin('Invalid user credentials.');
  });

  it('should not log in without password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin('Password field required.');
  });

  it('should not log in without email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyFailedLogin('Email field required.');
  });
});
