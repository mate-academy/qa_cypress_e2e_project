/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();

describe('Sign Up page', () => {
  let user;
  const takenEmail = 'riot@qa.team';
  const passwordSevenSymbols = 'Qainna1';
  const passwordWithoutCapital = 'qainna11';
  const passwordWithoutSmall = 'QAINNA11';
  const passwordWithoutNumber = 'IloveKatya';
  const emailWithoutAt = 'innaqagmail.com';
  const emailWithoutPoint = 'innaqa@gmailcom';;

  before(() => {
    cy.task('db:clear');
    cy.register();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visitSignUp();
  });

  it('should redirect to Sign In', () => {
    signUpPage.clickHaveAccountLink();
    signUpPage.checkUrl('login');
    signInPage.checkSignInParagraph();
  });

  it('should not sign up with taken Email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(takenEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Email already taken.');
  });

  it('should not sign up with seven symbols in the Password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordSevenSymbols);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not sign up without capital letter in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutCapital);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not sign up without small letter in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutSmall);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not sign up without number in the Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutNumber);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not sign up without "@" in the Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Email must be a valid email.');
  });

  it('should not sign up without "." in the Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutPoint);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Email must be a valid email.');
  });

  it('should not sign up without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Username field required.')
  });

  it('should not sign up without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Email field required.');
  });

  it('should not sign up without password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage('Password field required.');
  });

  it('should sign up user with valid data', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessfulRegistration();
  });
});