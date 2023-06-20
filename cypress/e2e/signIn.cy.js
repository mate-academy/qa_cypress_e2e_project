/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong Email', () => {
    signInPage.loginWrongEmail(user.email, user.password);
    signInPage.assertloginFailed('Login failed!', 'Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong Password', () => {
    signInPage.loginWrongPassword(user.email, user.password);
    signInPage.assertloginFailed('Login failed!', 'Invalid user credentials.');
  });
});
