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
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-modal')
      .should('contain', 'Your registration was successful!');
    cy.get('.swal-button')
      .click();

    homePage.usernameLink.should('contain', user.username);
  });

  it('should display validation errors for incomplete form submission', () => {
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
