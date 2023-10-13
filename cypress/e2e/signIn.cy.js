/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign in with empty email', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    signInPage.isLoginFailed();
    cy.wait(2000);
    signInPage.isEmailEmpty();
  });

  it('should not provide an ability to log in with wrong email', () => {
    const invalidEmail = 'wrong@xamplecom';
    
    signInPage.visit();
    signInPage.emailField.type(invalidEmail);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    homePage.modalWindow.should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    const invalidPassword = 'Test1!';
    
    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(invalidPassword);
    signInPage.signInBtn.click();
    homePage.modalWindow.should('contain', 'Invalid user credentials');
  });
});
