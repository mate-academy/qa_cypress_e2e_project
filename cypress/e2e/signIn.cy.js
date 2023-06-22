/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
let user;
const invalidCredsMessage = 'Invalid user credentials.';
const failedLoginMessage = 'Login failed!';
const invalidEmail = 'whatever@qa.com';
const invalidPassword = 'wrongpassword';

describe('Sign In page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    homePage.fillField('email-sign-in', user.email);
    homePage.fillField('password-sign-in', user.password);
    homePage.clickOnBtn('sign-in-btn');
    signInPage.assertSuccessfulLogin(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    homePage.fillField('email-sign-in', invalidEmail);
    homePage.fillField('password-sign-in', user.password);
    homePage.clickOnBtn('sign-in-btn');
    signInPage.assertUnsuccessfulLogIn(invalidCredsMessage, failedLoginMessage);
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    homePage.fillField('email-sign-in', user.email);
    homePage.fillField('password-sign-in', invalidPassword);
    homePage.clickOnBtn('sign-in-btn');
    signInPage.assertUnsuccessfulLogIn(invalidCredsMessage, failedLoginMessage);
  });
});
