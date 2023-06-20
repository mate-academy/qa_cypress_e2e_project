/// <reference types="cypress" />
/// <reference types="../support" />
import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const testData = {
  invalidEmail: '@gmail.com',
  invalidPassword: '12345'
};

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to register a new account with valid credentials', () => {
    const successMessage = 'Your registration was successful!'
    
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-text')
      .should('contain', successMessage)
    cy.contains('OK')
      .click();
    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to register a new account with invalid email', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(testData.invalidEmail);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Email must be a valid email.');
    });
  });

  it('should not provide an ability to register a new account with invalid password', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(testData.invalidPassword);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    });
  });

  it('should not provide an ability to register a new account with blank username field', () => {
    signUpPage.visit();
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Username field required.');
    });
  });

  it('should not provide an ability to register a new account with blank email field', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.passwordField
      .type(testData.invalidPassword);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Email field required.');
    });
  });

  it('should not provide an ability to register a new account with blank password field', () => {
    signUpPage.visit();
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(testData.invalidPassword);
    signUpPage.signUpBtn
      .click();
    cy.get('.swal-button')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration failed! Password field required.');
    });
  });
});

