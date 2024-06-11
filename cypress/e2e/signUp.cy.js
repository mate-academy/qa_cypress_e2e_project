/// <reference types='cypress' />
/// <reference types='../support' />

import alertsMessages from '../support/pages/alertmessage.pageObject.js';
import SignUpPageObject from '../support/pages/signup.pageObject.js';

// import HomePageObject from 'faker/lib/locales/he/index.js';
const signUpPage = new SignUpPageObject();
// const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up with valid details', () => {
    signUpPage.visit();
    signUpPage.fillUsername(user.username);
    signUpPage.fillEmail(user.email);
    signUpPage.fillPassword(user.password);
    signUpPage.submit();
    // cy.url().should('include', '/home');
    signUpPage.assertModalContent(alertsMessages().successfulMessage);
    // homePage.assertHeaderContainUsername(user.username);
  });

  it('should show an error with empty username', () => {
    signUpPage.visit();
    // cy.get('[data-cy="username"]').type();
    cy.get('[data-cy="email"]').type('Test123@gmail.com');
    cy.get('[data-cy="password"]').type('Qwert123!@');
    cy.get('[data-cy="signup-btn"]').click();
    signUpPage.assertModalContent(alertsMessages().emptyUsernameMessage);
  });

  it('should show an error with empty email', () => {
    signUpPage.visit();
    cy.get('[data-cy="username"]').type('Teststd');
    // cy.get('[data-cy="email"]').type('Test123@gmail.com');
    cy.get('[data-cy="password"]').type('Qwert123!@');
    cy.get('[data-cy="signup-btn"]').click();
    signUpPage.assertModalContent(alertsMessages().emptyEmailMessage);
  });

  it('should show an error with empty password', () => {
    signUpPage.visit();
    cy.get('[data-cy="username"]').type('Teststd');
    cy.get('[data-cy="email"]').type('Test123@gmail.com');
    // cy.get('[data-cy="password"]').type('Qwert123!@');
    cy.get('[data-cy="signup-btn"]').click();
    signUpPage.assertModalContent(alertsMessages().emptyPasswordMessage);
  });

  it('should show an error with invalid email value', () => {
    signUpPage.visit();
    cy.get('[data-cy="username"]').type('Teststd');
    cy.get('[data-cy="email"]').type('Test123gmail.com');
    cy.get('[data-cy="password"]').type('Qwert123!@');
    cy.get('[data-cy="signup-btn"]').click();
    signUpPage.assertModalContent(alertsMessages().invalidEmailMessage);
  });
});
