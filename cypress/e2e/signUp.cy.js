/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    homePage.checkRegistration();
    homePage.clickOnOkBtn();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to sign up with not valid email', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type('nataha@');
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to sign up with not valid password', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type('1');
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Password must be 8 characters');
  });

  it('should not provide an ability to sign up with blank username field', () => {
    signUpPage.visit();
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Username field required.');
  });

  it('should not provide an ability to sign up with blank email field', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Email field required.');
  });

  it('should not provide an ability to sign up with blank password field', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Password field required.');
  });

  it('should not provide an ability to sign up with only 8 spices in password field', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type('         ');
    signUpPage.signUpBtn.click();
    signUpPage.modalWindow.should('contain', 'Password must be 8 characters');
  });
});
