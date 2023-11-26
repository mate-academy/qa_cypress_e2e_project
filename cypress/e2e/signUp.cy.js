/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

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

  it('should provide an ability to sign up', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessfulRegistration('Welcome!');
  });

  it('should not provide an ability to sign up with empty username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up with empty email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });
});
