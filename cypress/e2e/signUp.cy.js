/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.PageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();

describe('Sign Up page', () => {
  let user;
  let credentialsSignUp;

  before(() => {
    cy.task('db:clear');
    cy.register();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('signUpData').then((signUpData) => {
      credentialsSignUp = signUpData;
    });
  });

  beforeEach(() => {
    signUpPage.visitSignUp();
  });

  it('should redirect to sign in page', () => {
    signUpPage.clickHaveAccountLink();
    signUpPage.checkUrl('login');
    signInPage.checkSignInParagraph();
  });

  it('should not sign up with empty Username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.usernameRequiredMessage)
  });

  it('should not sign up with empty Email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.emailRequiredMessage);
  });

  it('should not sign up with empty Password field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.passwordRequiredMessage);
  });

  it('should not sign up without "@" in Email field', () => {
    signUpPage.fillAllSignUpFields(user.username, credentialsSignUp.emailWithoutAt, user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.emailValidMessage);
  });

  it('should not sign up without "." in Email field', () => {
    signUpPage.fillAllSignUpFields(user.username, credentialsSignUp.emailWithoutDot, user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.emailValidMessage);
  });

  it('should not sign up with exist Email', () => {
    signUpPage.fillAllSignUpFields(user.username, credentialsSignUp.existEmail, user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.emailTakenMessage);
  });

  it('should not sign up with 7 characters password', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, credentialsSignUp.passwordSevenLenght);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.passwordValidMessage);
  });

  it('should not sign up with password without capital letter', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, credentialsSignUp.passwordWithoutCapital);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.passwordValidMessage);
  });

  it('should not sign up with password without small letter', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, credentialsSignUp.passwordWithoutSmall);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.passwordValidMessage);
  });

  it('should not sign up with password without number', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, credentialsSignUp.passwordWithoutNumber);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyFailedRegistration();
    signUpPage.verifyValidMessage(credentialsSignUp.passwordValidMessage);
  });

  it('should provide an ability to sign up', () => {
    signUpPage.fillAllSignUpFields(user.username, user.email, user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessfulRegistration();
  });
});
