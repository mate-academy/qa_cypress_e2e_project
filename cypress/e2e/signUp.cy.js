/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  let negativeUser;
  const message = {
    signUpPositive: 'Welcome!',
    signUpNegative: 'Registration failed!'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateNegativeUser').then(generateNegativeUser => {
      negativeUser = generateNegativeUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to sign up with correct credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    signUpPage.checkRegistration(message.signUpPositive);

    homePage.checkUsername(user.username);
  });

  it('should not provide an ability to sign up with wrong credentials', () => {
    signUpPage.typeUsername(negativeUser.username);
    signUpPage.typeEmail(negativeUser.email);
    signUpPage.typePassword(negativeUser.password);
    signUpPage.clickSignUp();

    signUpPage.checkRegistration(message.signUpNegative);

  });
});
