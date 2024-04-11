/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide an option to register with correct data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyRegistrationSuccess();
  });

  it('should not provide an ability to register with invalid username', () => {
    signUpPage.typeUsername(user.invalidUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });

  it('should not provide an ability to register with email without dot', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.emailWithoutDot);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });

  it('should not provide an ability to register with email without at', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.emailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });

  it('should not provide an ability to register with empty username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });
  it('should not provide an ability to sign up with empty email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });
  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration();
  });
});
