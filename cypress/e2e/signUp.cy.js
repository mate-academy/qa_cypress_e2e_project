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

  it('should provide the ability to sign up with valid data', () => {
    signUpPage.visit();

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
  it('should not provide the ability to sign up with invalid data', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type('123');
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
      cy.get('.swal-modal')
      .should('contain', 'Registration failed!')

  });
});
