/// <reference types='cypress' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  const testData = {
    negativeEmail: 'testemail123',
    signUpWelcomeMessage: 'Your registration was successful!',
    signUpFailedMessage: 'Email must be a valid email.'
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('sign up with positive credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.welcomeMessageSignUp(testData.signUpWelcomeMessage);

    signUpPage.assertUsername(user.username);
  });

  it('sign up with negative credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(testData.negativeEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.welcomeMessageSignUp(testData.signUpFailedMessage);
  });
});
