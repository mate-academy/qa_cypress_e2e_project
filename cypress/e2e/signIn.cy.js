/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let negativeUser;
  const message = {
    signInNegative: 'Login failed!'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateNegativeUser').then(generateNegativeUser => {
      negativeUser = generateNegativeUser;
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignIn();

    homePage.checkUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.typeEmail(negativeUser.email);
    signInPage.typePassword(negativeUser.password);
    signInPage.clickSignIn();

    signInPage.checkLogIn(message.signInNegative)
  });
});
