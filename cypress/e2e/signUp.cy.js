/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertSuccessfulSignUp();
    cy.confirmBtn('OK');
    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to sign up without username', () => {
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Username field required.');
    cy.confirmBtn('OK');
  });

  it('should not provide an ability to sign up without email', () => {
    signUpPage.usernameField
    .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Email field required.');
    cy.confirmBtn('OK');
  });

  it('should not provide an ability to sign up without password', () => {
    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
    .type(user.email);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Password field required.');
    cy.confirmBtn('OK');
  });

  it('should not provide an ability to sign up with invalid username', () => {
    signUpPage.usernameField
    .type('  ');
    signUpPage.emailField
    .type(user.email);
    signUpPage.passwordField
    .type(user.password);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Username must start with a letter, have no spaces, and be 3 - 40 characters.');
    cy.confirmBtn('OK');
  });

  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type('kwa');
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.confirmBtn('OK');
  });

  it('should not provide an ability to sign up with invalid email', () => {
    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
    .type('kwa');
    signUpPage.passwordField
    .type(user.password);
    signUpPage.signUpBtn
      .click();
    
    signUpPage.assertFailedSignUp();
    cy.assertSwalText('Email must be a valid email.');
    cy.confirmBtn('OK');
  });
});
