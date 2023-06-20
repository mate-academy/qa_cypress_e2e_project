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
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.registerNewUser().then(user => {
      cy.getByDataCy('email-sign-in').type(user.email);
      cy.getByDataCy('password-sign-in').type(user.password);
      cy.getByDataCy('sign-in-btn').click();
      cy.getByDataCy('username-link', user.username).should('exist');
    homePage.usernameLink
      .should('contain', user.username);
  });
});

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.emailField.type(`wrong${user.email}`);
    signInPage.passwordField.type(`${user.password}`);
    signInPage.signInBtn.click();
    cy.contains('.swal-modal', 'Invalid user credentials.').should('exist');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.emailField.type(`${user.email}`);
    signInPage.passwordField.type(`wrong${user.password}`);
    signInPage.signInBtn.click();
    cy.contains('.swal-modal', 'Invalid user credentials.').should('exist');
  });

});
