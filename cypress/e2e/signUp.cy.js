/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const failMessage = 'Registration failed!';

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
    signUpPage.clickOkBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent('Registration failed!');
    signUpPage.assertModalContent('Username field required.');
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with empty email field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(failMessage);
    signUpPage.assertModalContent('Email field required.');
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(failMessage);
    signUpPage.assertModalContent('Password field required.');
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with invalid email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(failMessage);
    signUpPage.assertModalContent('Email must be a valid email.');
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with existing email', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(failMessage);
    signUpPage.assertModalContent('Email already taken.');
    signUpPage.clickOkBtn();
  });

  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(failMessage);
    signUpPage.assertModalContent('Password must be 8 characters long');
    signUpPage.clickOkBtn();
  });
});
