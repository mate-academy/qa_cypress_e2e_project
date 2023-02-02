/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('newUser').then(newUser => {
      user = newUser;
    });
  });
  
  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
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

  it('should not provide an ability to log in with wrong credentials', () => {
    
  });
});
