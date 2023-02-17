/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
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
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    cy.intercept('POST', '/users/login')
      .as('login');

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    cy.wait('@login');
    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong Password', () => {
    const password = '11111111';
    const unsuccessLoginTitle = 'Login failed!';
    const unsuccessLoginText = 'Invalid user credentials.';
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(password);
    signInPage.signInBtn
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessLoginTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessLoginText);
  });

  it('should not provide an ability to log in with wrong Email', () => {
    const email = 'testuser';
    const unsuccessLoginTitle = 'Login failed!';
    const unsuccessLoginText = 'Email must be a valid email.';
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessLoginTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessLoginText);
  });
});
