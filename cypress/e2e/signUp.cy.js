/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

// eslint-disable-next-line no-unused-vars
const faker = require('faker');

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.assertRegistrationSuccessful();
    homePage.clickSuccessfulAlert();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should show an error message in case of sign' +
  'up with invalid email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertRegistrationFailedEmail();
  });

  it('should show an error message in case of sign' +
  'up with invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertRegistrationFailedPassword();
  });

  it('should show an error message in case of' +
  'sign up with empty username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertRegistrationEmptyUsername();
  });

  it('should show an error message in case of sign up with empty email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertRegistrationEmptyEmail();
  });

  it('should show an error message in case of sign' +
  'up with empty password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertRegistrationEmptyPassword();
  });
});
