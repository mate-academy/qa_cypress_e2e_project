/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to sign up a new user', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an error message when' +
    'the user doesn`t input the "Username" field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    signUpPage.findErrorMessage('Username field required.');
  });

  it('should provide an error message when' +
    ' the user doesn`t input the "Email" field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    signUpPage.findErrorMessage('Email field required.');
  });

  it('should provide an error message when' +
    ' the user doesn`t input the "Password" field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);

    signUpPage.clickSignUpBtn();
    signUpPage.findErrorMessage('Password field required.');
  });
});
