/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/singUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
    user = generateUser;
    signUpPage.visit();
  });
});

  it('should provide an ability to Sign up with existing credentials', () => {

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

  });

  it('should provide an ability to Sign up with wrong email', () => {

    signUpPage.typeEmail(' ');
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();

    signUpPage.wrongRegistration('Registration failed!');

  });

  it('should provide an ability to Sign up with wrong username', () => {

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername('%');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignInBtn();

    signUpPage.wrongRegistration('Registration failed!');

  });

  it('should provide an ability to Sign up with wrong password', () => {

    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(' 1');
    signUpPage.clickSignInBtn();

    signUpPage.wrongRegistration('Registration failed!');

  });
});
