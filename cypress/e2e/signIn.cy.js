/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const testData = {
  invalidEmail: '@mail.com',
  invalidPassword: '12345'
};

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
  });

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
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

  it('should not provide an ability to log in with invalid email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(testData.invalidEmail);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed! Email must be a valid email.');
    });
  });

  it('should not provide an ability to log in with invalid password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(testData.invalidPassword);
    signInPage.signInBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed! Invalid users credentials.');
    });
  });
});
