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

  it(`Sign in page should contain 'Sign in' title `, () => {
    signInPage.visit();
    cy.get('h1').should('contain.text', 'Sign in');
  });

  it(`Sign in page should contain 'Email' field `, () => {
    signInPage.visit();
    signInPage.emailField.should('exist');
  });

  it(`Sign in page should contain 'Password' button `, () => {
    signInPage.visit();
    signInPage.passwordField.should('exist');
  });

  it.only(`The user have an ability to log
     in with existing credentials`, () => {
      signInPage.visit();
      cy.registerNewUser().then(user => {
        cy.getByDataCy('email-sign-in').type(user.email);
        cy.getByDataCy('password-sign-in').type(user.password);
        cy.getByDataCy('sign-in-btn').click();
        cy.contains('a', user.username).should('exist');
        homePage.usernameLink.should('contain', user.username);
      })
  });

  it(`The users haven't an ability to log in with wrong email`, () => {
    signInPage.visit();
    signInPage.emailField.type(`a${user.email}`);
    signInPage.passwordField.type(`${user.password}`);
    signInPage.signInBtn.click();
    cy.contains('.swal-modal', 'Invalid user credentials.').should('exist');
  });

  it(`The users haven't an ability to log in with wrong password`, () => {
    signInPage.visit();
    signInPage.emailField.type(`${user.email}`);
    signInPage.passwordField.type(`${user.password}a`);
    signInPage.signInBtn.click();
    cy.contains('.swal-modal', 'Invalid user credentials.').should('exist');
  });
});
