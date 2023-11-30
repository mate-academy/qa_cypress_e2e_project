/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";
const faker = require('faker');

const homePage = new HomePageObject();
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

  it('should provide an ability to register new user', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register user with all required fields blank', () => {
    signUpPage.clickSignUpBtn();

    signUpPage.assertUserNameBlank();
  });

  it('should cover the password field with asterisks', () => {
    signUpPage.typePassword(user.password);

    signUpPage.checkPasswordAsterisks();
  });

  it('should not provide an ability to register user without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUserNameBlank();
  });

  it('should not provide an ability to register user without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertEmailBlankError();
  });

  it('should not provide an ability to register user without password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPasswordBlankError();
  });

  it('should not provide an ability to register user with email without at', () => {
    const newEmail = faker.name.firstName() + 'gmail.com';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(newEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmail();
  });

  it('should not provide an ability to register user with email without top-domain', () => {
    const newEmail = faker.name.lastName() + 'aol';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(newEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmail();
  });

  it('should not provide an ability to register user with password less than 8 chars', () => {
    const newPassword = 'Ab123fa';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertShortPassword();
  });

  it('should not provide an ability to register user with password without uppercase letter', () => {
    const newPassword = 'ab123fad';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertShortPassword();
  });

  it('should not provide an ability to register user with password without number', () => {
    const newPassword = 'Abfadude';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertShortPassword();
  });

  it('should not provide an ability to register user with password without letter', () => {
    const newPassword = '123456789';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertShortPassword();
  });

  it('should not provide an ability to register user with password without lowercase letter', () => {
    const newPassword = 'AQIJH123';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertShortPassword();
  });
});
