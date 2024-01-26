/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
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

  it('should provide an ability to register account', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.checkSuccess('Your registration was successful!');
    signUpPage.clickOnTheModalOk();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Username field required.');
  });

  it('should not provide an ability to sign up without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Email field required.');
  });

  it('should not provide an ability to sign up without a password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Password field required.');
  });
});
