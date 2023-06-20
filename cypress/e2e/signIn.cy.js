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

  it('should not provide an ability to sign in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField
      .type(`iia${user.email}`);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    signInPage.assertFailedSignIn();
  });

  it('should not provide an ability to sign in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(`wrong${user.password}`);
    signInPage.signInBtn
      .click();

    signInPage.assertFailedSignIn();
  });
});
