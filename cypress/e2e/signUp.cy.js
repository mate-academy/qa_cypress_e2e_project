/// <reference types="cypress" />
/// <reference types="../support" />
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signInBtn.click();
    signUpPage.assertSuccessfulSignUp();
    signUpPage.clickOnOkBtnWindow();
    signUpPage.assertUsername(user.username);
  });

  it('should not provide an ability to register with empty Username field', () => {
    signUpPage.visit();
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signInBtn.click();
    signUpPage.assertFailedSignUpEmptyUsername();
  });

  it('should not provide an ability to register with email without @ symbol', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type('testqa.team');
    signUpPage.passwordField.type(user.password);
    signUpPage.signInBtn.click();
    signUpPage.assertFailedSignUpInvalidEmail();
  });

  it('should not provide an ability to register with password without any numbers', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type('Qwertyu!');
    signUpPage.signInBtn.click();
    signUpPage.assertFailedSignUpInvalidPassword();
  });
});
