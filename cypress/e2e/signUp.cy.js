/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!',
  wrongEmail: 'riotqa.team',
  wrongPassword: 'qwert12345!'
};
const emailWithoutAt = userData.email.replace('@', '');
const emailWithoutDot = userData.email.replace('.', '');
const wrongPassword = '12';

describe('Sign Up page', () => {
  beforeEach(() => {
cy.task('db:clear');
cy.visit('#/register');
  });

  it('should provide the ability to register with valid data', () => {

    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.email);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    homePage.assertUsernameLink(userData.username);
    signUpPage.assertSuccessfulRegistration(
      'Welcome!',
      'Your registration was successful!'
    );
  });

  it('should not provide the ability to register with empty required field', () => {
    signUpPage.typeEmailField(userData.email);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertEmptyRequiredField(
      'Registration failed!',
      'Username field required.'
    )

    cy.get('.swal-button').click();

    signUpPage.typeUsernameField(userData.username);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertEmptyRequiredField(
      'Registration failed!',
      'Email field required.'
    )

    cy.get('.swal-button').click();

    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.email);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertEmptyRequiredField(
      'Registration failed!',
      'Password field required.'
    )

  });
  it('should not provide the ability to register with invalid email', () => {
    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(emailWithoutAt);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertWrongData(
      'Registration failed!',
      'Email must be a valid email.' 
    );

    cy.get('.swal-button').click();

    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(emailWithoutDot);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertWrongData(
      'Registration failed!',
      'Email must be a valid email.' 
    );
    
  });

  it('should not provide the ability to register with invalid password', () => {
    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.email);
    signUpPage.typePasswordField(wrongPassword);
    signUpPage.clickSignUpBtn();
    addMatchImageSnapshotCommand();
    signUpPage.assertWrongData(
      'Registration failed!',
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.' 
    );
  });

});
