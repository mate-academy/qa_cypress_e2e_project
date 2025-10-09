/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should log in with correct credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.contains(user.username).should('be.visible');
  });

  it('should not log in with wrong password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword');
    signInPage.clickSignInBtn();

    cy.contains('email or password is invalid').should('be.visible');
  });
});
