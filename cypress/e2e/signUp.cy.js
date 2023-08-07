/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const userDataWrong = {
  wrongEmail1: 'qa.team',
  wrongPassword1: '1',
  wrongEmail2: 'qa@team',
  wrongPassword2: 'Wrongpassword',
  wrongPassword3: 'Qwer12!',
  wrongUsername: '!'
};

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertUsernameLink(user.username);
    homePage.assertHomePageUrl();
    signUpPage.assertSuccessfulSignUp();
  });

  it('should not provide an ability to sign up with empty Username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageEmptyUsername();
  });

  it('should not provide an ability to sign up with empty Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageEmptyEmail();
  });

  it('should not provide an ability to sign up with empty Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageEmptyPassword();
  });

  it('should not provide an ability to sign up with only "!" symbol in the Username field', () => {
    signUpPage.typeUsername(userDataWrong.wrongUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongUsername();
  });

  it('should not provide an ability to sign up with 7 characters in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(userDataWrong.wrongPassword3);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongPassword();
  });

  it('should not provide an ability to sign up with 1 character in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(userDataWrong.wrongPassword1);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongPassword();
  });

  it('should not provide an ability to sign up with only letters in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(userDataWrong.wrongPassword2);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongPassword();
  });

  it('should not provide an ability to sign up without "@" symbol in the Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(userDataWrong.wrongEmail1);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongEmail();
  });

  it('should not provide an ability to sign up without "." symbol in the Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(userDataWrong.wrongEmail2);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessageWrongEmail();
  });
});
