/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from "../support/pages/home.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
let user;

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    homePage.checkRegistration();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to register with blank username field', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Username field required.');
  });

  it('should not provide an ability to register with blank email field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword('12345Qwert!');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Email field required.');
  });

  it('should not provide an ability to register user with blank password field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Password field required.');
  });

  it('should not provide an ability to register with invalid password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345Q');
    signUpPage.clickOnSignUp();
    signUpPage.modalWindow.should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
