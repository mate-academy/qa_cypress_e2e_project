/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import { generateUser, generateWrongData } from '../support/generateData';
import SignUpPageObject from '../support/pages/signUp.pageObject ';

const wrongData = generateWrongData();
const signUpPage = new SignUpPageObject();

const passwordErrorMessage = 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.';
const successfulRegistrationMessage = 'Your registration was successful!';
const emailInvalidMessage = 'Email must be a valid email.';

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    user = generateUser();
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', successfulRegistrationMessage);
  });

  it('should not provide an ability to sign up with 7-char password and valid username and email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongData.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', passwordErrorMessage);
  });

  it('should not provide an ability to sign up with email without name part and valid username and password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongData.emailWithoutName);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', emailInvalidMessage);
  });

  it('should not provide an ability to sign up with email without domain part and valid username and password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongData.emailWithoutDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', emailInvalidMessage);
  });
});
