/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signup.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with positive credentials ', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.textErrorMessage('Welcome!');
    signUpPage.textErrorMessage('Your registration was successful!');

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.textErrorMessage('Registration failed!');
    signUpPage.textErrorMessage('Username field required.');
  });

  it('should not provide an ability to sign up with wrong email', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('user@gmailcom');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.textErrorMessage('Registration failed!');
    signUpPage.textErrorMessage('Email must be a valid email.');
  });

  it('should not provide an ability to sign up with with a one-character password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword("1");
    signUpPage.clickSignUpBtn();

    signUpPage.textErrorMessage('Registration failed!');
    signUpPage.textErrorMessage('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.textErrorMessage('Registration failed!');
    signUpPage.textErrorMessage('Password field required.');
  });
});
