/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject;

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.visit('/#/register');
  });

  it('should allow to sign up with valid creds', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.randomPassword);
    signUpPage.clickOnSignUpBtn;

    cy.assertSuccessfulRegistration(user.username);
  });

  it('should not allow to sign up with an empty "Username" field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.randomPassword);
    signUpPage.clickOnSignUpBtn;

    cy.assertSignUpEmptyUsernameMessage();

  });

  it('should not allow to sign up with an empty "Email" field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.randomPassword);
    signUpPage.clickOnSignUpBtn;

    cy.assertSignUpEmptyEmailMessage();
  });

  it('should not allow to sign up with an empty "Password" field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickOnSignUpBtn;

    cy.assertSignUpEmptyPasswordMessage();
  });

  it('should not allow to sign up with email without "name" part', () => {
    const invalidEmail = '@domain.com'
    cy.fillSignUpWithInvalidEmail(user, invalidEmail);

    cy.assertSignUpInvalidEmalMessage();
  });

  it('should not allow to sign up with email without "domain" part', () => {
    const invalidEmail = 'name.com'
    cy.fillSignUpWithInvalidEmail(user, invalidEmail);

    cy.assertSignUpInvalidEmalMessage();
  });

  it('should not allow to sign up with email without "top-domain" part', () => {
    const invalidEmail = 'name@domain'
    cy.fillSignUpWithInvalidEmail(user, invalidEmail);

    cy.assertSignUpInvalidEmalMessage();
  });

  it('should allow to sign up with 7 characters in the password', () => {
    const invalidPassowrd = 'Qwert1!';
    cy.fillSignUpWithInvalidPassword(user, invalidPassowrd);

    cy.assertSignUpPasswordRequirementsMessage();
  });

  it('should allow to sign up without a Capital letter in the password', () => {
    const invalidPassowrd = 'qwerty1!';
    cy.fillSignUpWithInvalidPassword(user, invalidPassowrd);

    cy.assertSignUpPasswordRequirementsMessage();
  });

  it('should allow to sign up without a lowercase letter in the password', () => {
    const invalidPassowrd = 'QWERTY1!';
    cy.fillSignUpWithInvalidPassword(user, invalidPassowrd);

    cy.assertSignUpPasswordRequirementsMessage();
  });

  it('should allow to sign up without a digit in the password', () => {
    const invalidPassowrd = 'Qwerty!@';
    cy.fillSignUpWithInvalidPassword(user, invalidPassowrd);

    cy.assertSignUpPasswordRequirementsMessage();
  });
});
