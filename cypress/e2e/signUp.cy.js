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

  it.only('should provide an ability to sign up with valid credentials', () => {
    // signUpPage.usernameField.type(user.username);
    // signUpPage.emailField.type(user.email);
    // signUpPage.passwordField.type(user.password);
    // signUpPage.signUpBtn.click();

    cy.get('[placeholder="Username"]').type(user.username);
    cy.get('[placeholder="Email"]').type(user.email);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.contains('.btn', 'Sign up').click();

    cy.get('.swal-modal').should('contain', 'Your registration was successful!');
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to sign up with invalid credentials', () => {
    // signUpPage.usernameField.type(user.username);
    // signUpPage.emailField.type(user.email);
    // signUpPage.passwordField.type('Wrong password');
    // signUpPage.signUpBtn.click();

    cy.get('[placeholder="Username"]').type(user.username);
    cy.get('[placeholder="Email"]').type(user.email);
    cy.get('[placeholder="Password"]').type('Wrong password');
    cy.contains('.btn', 'Sign up').click();

    cy.get('.swal-modal').should('contain', 'Registration failed!');
  });
});
