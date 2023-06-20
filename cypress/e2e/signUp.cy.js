/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const testData = {
  invalidEmail: faker.name.firstName() + 'mail.com',
  invalidPassword: faker.lorem.word()
}

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide ability to successful register new user', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should provide ability not to register new user with empty username field', () => {
    signUpPage.visit();

    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    signUpPage.modalAllert
      .should('contain', 'Username field required.')
  });

  it('should provide ability not to register new user with empty email field', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    signUpPage.modalAllert
      .should('contain', 'Email field required.')
  });

  it('should provide ability not to register new user with empty password field', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.signUpBtn
      .click();

    signUpPage.modalAllert
      .should('contain', 'Password field required.')
  });

  it('should provide ability not to register new user with invalid email', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(testData.invalidEmail);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    signUpPage.modalAllert
      .should('contain', 'Email must be a valid email.')
  });

  it('should provide ability not to register new user with invalid password', () => {
    signUpPage.visit();

    signUpPage.usernameField
    .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(testData.invalidPassword);
    signUpPage.signUpBtn
      .click();

    signUpPage.modalAllert
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
  });
});
