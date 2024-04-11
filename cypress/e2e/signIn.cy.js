/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signInPage.visit();
    });
  })

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in without email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Email field required.');
  });

  it('should not provide an ability to log in without password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Password field required.');
  });

  it('should not provide an ability to log in without password and email', () => {
    cy.register(user.email, user.username, user.password);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Email field required.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.wrongPassword);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.wrongEmail);
    signInPage.typePassword(user.password);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong email and password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.wrongEmail);
    signInPage.typePassword(user.wrongPassword);
    cy.intercept('/users/login').as('loginUser');
    signInPage.clickSignInBtn();
    cy.wait('@loginUser').its('response.statusCode').should('eq', 422);
    signInPage.assertSwalText('Invalid user credentials.');
  });
});
