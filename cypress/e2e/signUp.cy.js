/* eslint-disable max-len */
import HomePageObject from '../support/pages/home.pageObject.js';
import SignUpPageObject from '../support/pages/signUp.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();

let user;

/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/');
  });

  it('should provide an option to register with non-existent credentials', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests(user.username, user.email, user.password);

    signUpPage.assertMassage(`Your registration was successful!`);
    signUpPage.assertAfterSingUpByUsername(user.username);
  });

  it('should not provide an ability to sign up with wrong Username', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests('Mike!%l', user.email, user.password);

    homePage.assertErrorMassageTitle(`Registration failed!`);
  });

  it('should not provide an ability to sign up with empty Username', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpWithEmptyUsername(user.email, user.password);

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Username field required.`);
  });

  it('should not provide an ability to sign up with wrong Email', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests(user.username, 'wrong Email', user.password);

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Email must be a valid email.`);
  });

  it('should not provide an ability to sign up with existing Email', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests(user.username, user.email, user.password);

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Email already taken.`);
  });

  it('should not provide an ability to sign up with empty Email', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpWithEmptyEmail(user.username, user.password);

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Email field required.`);
  });

  it('should not provide an ability to sign up with 1 character Password', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests(user.username, user.email, 'a');

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter`);
  });

  it('should not provide an ability to sign up with 7 character Password', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpForTests(user.username, user.email, 'A1grtyd');

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter`);
  });

  it('should not provide an ability to sign up with empty Password', () => {
    homePage.assertSignUpLinkAndClick();
    signUpPage.signUpWithEmptyPassword(user.username, user.email);

    signUpPage.assertErrorMassageTitle(`Registration failed!`);
    signUpPage.assertErrorMassage(`Password field required.`);
  });
});
