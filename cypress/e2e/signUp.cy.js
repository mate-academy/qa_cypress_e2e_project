/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/SignUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.successfulSignUpMessage();
  });

  it('should not allow to sign up with empty username', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.MessageUsernameRequired();
  });

  it('should not allow to sign up with empty email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.MessageEmailRequired();
  });

  it('should not allow to sign up with empty password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.MessagePasswordRequired();
  });

  it('should not allow to sign up with invalid email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    cy.findByPlaceholder('Email').type(user.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.MessageInvalidEmail();
  });

  it('should not allow to sign up with invalid password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    cy.findByPlaceholder('Password').type(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.MessageInvalidPassword();
  });
});
