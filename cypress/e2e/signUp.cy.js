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
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide an ability to sign up', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessfulRegistration('Welcome!');
    homePage.assertLogoConduit();
  });

  it('should not provide an ability to sign up with empty username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up with empty email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up without name-part in email', () => {
    const wrongEmail = '@gmail.com';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up without domain in email', () => {
    const wrongEmail = 'test@.com';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up without top-domain in email', () => {
    const wrongEmail = 'test@gmail';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });

  it('should not provide an ability to sign up without @ in email', () => {
    const wrongEmail = 'testgmail.com';
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration('Registration failed!');
  });
});
