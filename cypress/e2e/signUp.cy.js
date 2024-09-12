/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  const invalidEmail = '1gmail.com';
  const invalidPassword = 'super';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sing up new user', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertRegistrationWasSuccessful();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with an invalid email', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.wait(3000);

    signUpPage.assertRegistrationFailed('Email must be a valid email');
  });

  it('should not provide an ability to sign up with an empty username field', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.wait(3000);

    signUpPage.assertRegistrationFailed('Username field required.');
  });

  it('should not provide an ability to sign up with an invalid password', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidPassword);
    signUpPage.clickSignUpBtn();

    cy.wait(3000);

    signUpPage.assertRegistrationFailed('Password must be 8 characters long');
  });

  it('should not provide an ability to sign up with an empty email field', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.wait(3000);

    signUpPage.assertRegistrationFailed('Email field required.');
  });

  it('should not provide an ability to sign up with an empty password field', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    cy.wait(3000);

    signUpPage.assertRegistrationFailed('Password field required.');
  });
});
