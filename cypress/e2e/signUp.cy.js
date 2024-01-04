/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  before(() => {
    cy.task('db:clear');
  });
  beforeEach(() => {
    signUpPage.visit();
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });
  });

  it('should register with valid credentials', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').valid
    );
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
    cy.get('.swal-button').click();
    cy.getByDataCy('username-link').should('contain', user.username);
  });
  it('should not register with too short password', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').short
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with only lowercase password', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').nocapital
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with only capital letters password', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').nolowercase
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with only symbols password', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').symbols
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with a password without numbers', () => {
    signUpPage.fullyRegister(
      user.username,
      user.email,
      Cypress.env('password').nonumbers
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should return error when using email in wrong format (no@)', () => {
    signUpPage.fullyRegister(
      user.username,
      Cypress.env('email').noat,
      Cypress.env('password').valid
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should return error when using email without domain', () => {
    signUpPage.fullyRegister(
      user.username,
      Cypress.env('email').nodomain,
      Cypress.env('password').valid
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with too short username', () => {
    signUpPage.fullyRegister(
      Cypress.env('username').oneLetter,
      user.email,
      user.password
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with space in username', () => {
    signUpPage.fullyRegister(
      Cypress.env('username').withspace,
      user.email,
      user.password
    );
    signUpPage.assertIfRegistrationFailed();
  });
  it('should not register with empty username', () => {
    signUpPage.fullyRegister(
      Cypress.env('username').empty,
      user.email,
      user.password
    );
    signUpPage.assertIfRegistrationFailed();
  });
});
