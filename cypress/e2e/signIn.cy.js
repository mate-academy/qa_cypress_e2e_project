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
    signInPage.visit();
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    
    cy.register(user.email, user.username, user.password);
    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with not registered email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.emailField
      .type('random@sht.email');
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();
    cy.contains('.swal-title','Login failed');
  });
  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type('wrongpassword');
    signInPage.signInBtn
      .click();
    cy.contains('.swal-title','Login failed');
  });
});
