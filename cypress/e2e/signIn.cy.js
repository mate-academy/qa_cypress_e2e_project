/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  const errorMessage = 'Login failed!';

  beforeEach(() => {
    signInPage.visit();
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register().then(user => {
      signInPage.emailField
        .type(user.email);
      signInPage.passwordField
        .type(user.password);
      signInPage.signInBtn
        .click();

      homePage.usernameLink
        .should('contain', user.username);
    });
  });

  it('should not provide an ability to log in with wrong credentials (email)', () => {
    cy.register().then(user => {
      signInPage.emailField
        .type('123doggmail.com');
      signInPage.passwordField
        .type(user.password);
      signInPage.signInBtn
        .click();

      cy.get('.swal-title').should('contain.text', errorMessage);
      cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
    });
  });

  it('should not provide an ability to log in with wrong credentials (password)', () => {
    cy.register().then(user => {
      signInPage.emailField
        .type(user.email);
      signInPage.passwordField
        .type('1.1');
      signInPage.signInBtn
        .click();

      cy.get('.swal-title').should('contain.text', errorMessage);
      cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
    });
  });
});
