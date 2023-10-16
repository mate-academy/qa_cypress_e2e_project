/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import * as alertMessage from '../support/alertMessages';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.successfulMessage);
    signUpPage.clickOkBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.emptyUsernameMessage);
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with empty email field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.emptyEmailMessage);
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.emptyPasswordMessage);
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with invalid email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.invalidEmailMessage);
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with existing email', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.takenEmailMessage);
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertMessage.registrationFailedMessage);
    signUpPage.assertModalContent(alertMessage.invalidPasswordMessage);
    signUpPage.clickOkBtn();
  });
});