/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to register user with valid value', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    homePage.checkRegistration();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to register user without username', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Username field required.');
  });

  it('should not provide an ability to register user without email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Email field required.');
  });

  it('should not provide an ability to register user without password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Password field required.');
  });

  it('should not provide an ability to register user with invalid password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('123');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
