/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObjects';
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

  it('should provide an ability to sign up a user', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.modalWindow
      .should('contain', 'Welcome!');
  });

  it('should not register a user with an invalid format email', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.modalWindow
      .should('contain', 'Email must be a valid email.');
  });
});
