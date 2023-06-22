/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();

const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField
      .type('test' + user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed! Invalid user credentials.');
    });
  });
  it('should not provide an ability to log in with wrong password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password + '123');
    signInPage.signInBtn
      .click();
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed! Invalid user credentials.');
    });
  });
});
