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
    signUpPage.visit();
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should sign up with valid credentials', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);  

  });
  it('should show an error with invalid email', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type('invalid.user.email');
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    cy.contains('.swal-text', 'Email must be a valid email.');

  });
  it('should show an error with too short password', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(' ');
    signUpPage.signUpBtn
      .click();
    cy.contains('.swal-text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter. ');

  });
});
