/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.generateAndRegisterUser().then((generatedUser) => {
      user = generatedUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to register with valid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSuccModal();
  });

  it('should not provide an ability to register without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertFailModal();
  });

  it('should not provide an ability to register without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertFailModal();
  });

  it('should not provide an ability to register without a password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertFailModal();
  });

  it('should not provide an ability to register with blank fields', () => {
    signUpPage.clickSignUpBtn();
    signUpPage.assertFailModal();
  });
});
