/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const testData = {
  password: '123123123',
  email: 'user123@gmail.com'
};
describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();
    signUpPage.emailField
      .type(user.email);
    signUpPage.usernameField
      .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click({ force: true });

    homePage.usernameLink
      .should('contain', user.username);
  });
  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.visit();
    signUpPage.emailField
      .type(user.email);
    signUpPage.usernameField
      .type(user.username);
    signUpPage.passwordField
      .type(testData.password);
    signUpPage.signUpBtn
      .click({ force: true });
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    });
  });

  it('should not provide an ability to sign up with blank username field', () => {
    signUpPage.visit();
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click({ force: true });
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Username field required.');
    });
  });
  it('should not provide an ability to sign up with blank email field', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click({ force: true });
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Email field required.');
    });
  });
  it('should not provide an ability to sign up with blank password field', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.signUpBtn
      .click({ force: true });
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Password field required.');
    });
  });
  it('should not provide an ability to sign up with email already registered', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(testData.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click({ force: true });
    cy.get('.swal-button--confirm')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Email already taken');
    });
  });
});
