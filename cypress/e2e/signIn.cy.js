/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const testData = {
  invalidEmail: faker.internet.email(),
  invalidPassword: faker.internet.password()
};

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
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

  it('should not provide an ability to log in with wrong Email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

  signInPage.emailField
    .type(testData.invalidEmail);
  signInPage.passwordField
    .type(user.password);
  signInPage.signInBtn
    .click();

  signInPage.modalAllert
    .should('contain', 'Login failed!')
  });

  it('should not provide an ability to log in with wrong Password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

  signInPage.emailField
    .type(user.email);
  signInPage.passwordField
    .type(testData.invalidPassword);
  signInPage.signInBtn
    .click();

  signInPage.modalAllert
    .should('contain', 'Login failed!')
  });
});
