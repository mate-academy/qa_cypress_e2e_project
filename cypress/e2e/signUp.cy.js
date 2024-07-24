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

  it('should provide an ability to sign up a new user', () => {
    signUpPage.visit();

    signUpPage.inputUsername(user.username);
    signUpPage.inputEmail(user.email);
    signUpPage.inputPassword(user.password);

    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an error message when' +
    'the user doesn`t input the "Username" field', () => {
    signUpPage.visit();

    signUpPage.inputEmail(user.email);
    signUpPage.inputPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.findErrorMessage('Username field required.');
  });

  it('should provide an error message when' +
    ' the user doesn`t input the "Email" field', () => {
    signUpPage.visit();

    signUpPage.inputUsername(user.username);
    signUpPage.inputPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.findErrorMessage('Email field required.');
  });

  it('should provide an error message when' +
    ' the user doesn`t input the "Password" field', () => {
    signUpPage.visit();

    signUpPage.inputUsername(user.username);
    signUpPage.inputEmail(user.email);

    signUpPage.clickSignUpBtn();

    signUpPage.findErrorMessage('Password field required.');
  });
});
