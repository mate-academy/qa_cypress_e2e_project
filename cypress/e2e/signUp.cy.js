/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUp = new SignUpPageObject();
const homePage = new HomePageObject();

let user;
const successfulRegistrationMessage = 'Your registration was successful!';
const errorMessage = 'Registration failed!';

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
    signUp.visit();
  });

  it('should provide the ability to sign up with valid creds', () => {
    homePage.fillField('username-sign-up', user.username);
    homePage.fillField('email-sign-up', user.email);
    homePage.fillField('password-sign-up', user.password);
    homePage.clickOnBtn('sign-up-btn');
    signUp.assertSuccessfulRegistration(successfulRegistrationMessage, user.username);
  });

  it('should not provide the ability to sign up with the empty username field', () => {
    homePage.fillField('email-sign-up', user.email);
    homePage.fillField('password-sign-up', user.password);
    homePage.clickOnBtn('sign-up-btn');
    signUp.assertUnsuccessfulRegistration(errorMessage);
  });

  it('should not provide the ability to sign up with the empty email field', () => {
    homePage.fillField('username-sign-up', user.username);
    homePage.fillField('password-sign-up', user.password);
    homePage.clickOnBtn('sign-up-btn');
    signUp.assertUnsuccessfulRegistration(errorMessage);
  });

  it('should not provide the ability to sign up with the empty password field', () => {
    homePage.fillField('username-sign-up', user.username);
    homePage.fillField('email-sign-up', user.email);
    homePage.clickOnBtn('sign-up-btn');
    signUp.assertUnsuccessfulRegistration(errorMessage);
  });
});