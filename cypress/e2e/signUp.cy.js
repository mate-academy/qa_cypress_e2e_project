/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  const message = {
    successfulSignUp: 'Your registration was successful!',
    failedSignUp: 'Registration failed!',
    usernameFieldEmpty: 'Username field required.',
    invalidEmail: 'Email must be a valid email',
    invalidPassword: 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.',
}

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit();
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertMessage(message.successfulSignUp);
    homePage.clickOkBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertMessage(message.failedSignUp);
    homePage.assertMessage(message.usernameFieldEmpty);
  });

  it('should not provide an ability to sign up with invalid email', () => {
    const invalidEmail = faker.lorem.word();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessage(message.failedSignUp);
    signUpPage.assertMessage(message.invalidEmail);
  });

  it('should not provide an ability to sign up with invalid password (shorter than 10 characters)', () => {
    const invalidPassword = 'asDF78h';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessage(message.failedSignUp);
    signUpPage.assertMessage(message.invalidPassword);
  });

  it('should not provide an ability to sign up with invalid password (without numbers)', () => {
    const invalidPassword = 'asDKJnmh';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertMessage(message.failedSignUp);
    signUpPage.assertMessage(message.invalidPassword);
  });
});
