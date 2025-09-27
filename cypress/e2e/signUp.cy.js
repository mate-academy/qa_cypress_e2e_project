/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SwalMessagePageObject from '../support/swalMessages/SwalMessages.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const swalMessage = new SwalMessagePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should register user with correct data', () => {
    signUpPage.typeAllSignUpData(user.username, user.email, user.password);

    signUpPage.clickSignUpBtn();

    swalMessage.registrationSuccess();

    homePage.assertHeaderContainUsername(user.username);
  });

  describe('should not provide an ability to register user without requiered data', () => {
    it('should contain username', () => {
      const userError = 'Username field required.';

      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(userError);
    });

    it('should contain email', () => {
      const emailError = 'Email field required.';

      signUpPage.typeUsername(user.username);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(emailError);
    });

    it('should contain password', () => {
      const passowordError = 'Password field required.';

      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(passowordError);
    });
  });

  describe('should not provide an ability to register user with wrong email', () => {
    const emailErrorMessage = 'Email must be a valid email.';

    it('should contain @', () => {
      signUpPage.typeAllSignUpData(user.username, 'name.mail.com', user.password);

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(emailErrorMessage);
    });

    it('should contain at least 1 character before "@"', () => {
      signUpPage.typeAllSignUpData(user.username, '@mail.com', user.password);

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(emailErrorMessage);
    });

    it('should contain at least 1 character before "@", "@" and domain part', () => {
      signUpPage.typeAllSignUpData(
        user.username,
        `${user.username}@mymail`,
        user.password
      );

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(emailErrorMessage);
    });
  });

  describe('should not provide an ability to register user with wrong password', () => {
    const passwordErrorMessage =
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.';

    it('should must be 8 characters long', () => {
      signUpPage.typeAllSignUpData(user.username, user.email, 'Pass0');

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(passwordErrorMessage);
    });

    it('should must include 1 number', () => {
      signUpPage.typeAllSignUpData(user.username, user.email, 'Password');

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(passwordErrorMessage);
    });

    it('should must include 1 uppercase letter', () => {
      signUpPage.typeAllSignUpData(user.username, user.email, 'password2');

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(passwordErrorMessage);
    });

    it('should must include 1 lowercase letter', () => {
      signUpPage.typeAllSignUpData(user.username, user.email, 'PASSWORD3');

      signUpPage.clickSignUpBtn();

      swalMessage.registrationFailed(passwordErrorMessage);
    });
  });
});
