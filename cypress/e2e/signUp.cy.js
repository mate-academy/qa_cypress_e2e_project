/* eslint-disable max-len */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to register a user', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.wait(5000);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide the ability to register with incorrect password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.passwordField.type('123');
    signUpPage.clickSignUpBtn();

    homePage.assertErrorModalSignUp();
  });
  it('should not provide the ability to register with incorrect email', () => {
    const incorrectEmail = faker.lorem.word();

    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.emailField.type(incorrectEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertErrorModalSignUp();
  });
  it('should not provide the ability to register with blank fields', () => {
    signUpPage.visit();

    signUpPage.clickSignUpBtn();

    homePage.assertErrorModalSignUp();
  });
});
