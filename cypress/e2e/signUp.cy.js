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
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertSuccessfulSignUp();
    signUpPage.clickOnOkBtnWindow();
    signUpPage.assertUsername(user.username);
  });

  it('should not provide an ability to register with empty Username field', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertFailedSignUpEmptyUsername();
  });

  it('should not provide an ability to register with email without @ symbol', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('testqa.team');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();
    signUpPage.assertFailedSignUpInvalidEmail();
  });

  it('should not provide an ability to register with password without any numbers', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Qwertyu!');
    signUpPage.clickSignInBtn();
    signUpPage.assertFailedSignUpInvalidPassword();
  });
});
