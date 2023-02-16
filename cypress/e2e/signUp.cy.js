/// <reference types="cypress" />
/// <reference types="../support" />


import SignUpPageObject from '../support/pages/signUp.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const homePage = new homePageObject();
const signUp = new SignUpPageObject();

describe('Sign Up page', () => {
let user;
const errorMsg = 'Registration failed!';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    signUp.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {

    signUp.usernameField
      .type(user.username);
    signUp.emailField
      .type(user.email);
    signUp.passwordField
      .type(user.password);
    signUp.signUpBtn
      .click();

    homePage.modalWind
      .should('contain', 'Your registration was successful!')
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not ptovide an ability to sign up if username field is empty', () => {

    signUp.emailField
      .type(user.email);
    signUp.passwordField
      .type(user.password);
    signUp.signUpBtn
      .click();

    signUp.modalWind
      .should('contain', errorMsg);

    cy.url()
      .should('contain', '/register');
  });

  it('should not provide an ability to sign up if email field is empty', () => {

    signUp.usernameField
      .type(user.username);
    signUp.passwordField
      .type(user.password);
    signUp.signUpBtn
      .click();


    signUp.modalWind
      .should('contain', errorMsg);
    
    cy.url()
      .should('contain', '/register');
  });

  it('should not provide an ability to sign up if password field is empty', () => {

    signUp.usernameField
      .type(user.username);
    signUp.emailField
      .type(user.email);
    signUp.signUpBtn
      .click();
    
    signUp.modalWind
      .should('contain', errorMsg);
    
      cy.url()
      .should('contain', '/register');
  });
});