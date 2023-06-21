/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);

    cy.register(user.email, user.username, user.password);
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type('Wrong password');
    signInPage.signInBtn.click();

    signInPage.assertLogin('Login failed!');
  });
});
