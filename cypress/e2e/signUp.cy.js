/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const testData = {
  email: 'testUser#$qa.team',
  password: 'qwerty'
};

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    signUpPage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not sign up with email containing special characters', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(testData.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessMessage('Email must be a valid email.');
  });

  it('should not sign up with invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(testData.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessMessage(
      'Password must be 8 characters long and include 1 number, ' +
      '1 uppercase letter, and 1 lowercase letter.'
    );
  });
});
