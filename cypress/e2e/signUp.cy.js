/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import faker from 'faker';

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

  it('should provide ability to register with valid credentials', () => {
    const successfulMessage = 'Your registration was successful!';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalText(successfulMessage);
  });

  it('should not provide ability to register with empty username field', () => {
    const emptyUsernameMessage = 'Username field required.';

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalText(emptyUsernameMessage);
  });

  it('should not provide ability to register with empty email field', () => {
    const emptyEmailMessage = 'Email field required.';

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalText(emptyEmailMessage);
  });

  it('should not provide ability to register with empty password field', () => {
    const emptyPasswordMessage = 'Password field required.';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalText(emptyPasswordMessage);
  });

  it('should not provide ability to register with invalid email', () => {
    const invalidEmail = faker.lorem.word();
    const invalidEmailMessage = 'Email must be a valid email.';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalText(invalidEmailMessage);
  });
});
