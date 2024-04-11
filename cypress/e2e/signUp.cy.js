/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with existing credentials', () => {
    signUpPage.visit();

    signUpPage.signUpUsernameField
      .type(user.username);
    signUpPage.signUpEmailField
      .type(user.email);
    signUpPage.signUpPasswordField
      .type(user.password);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Welcome!');
    cy.getBySwalText('Your registration was successful!');
    cy.sweetAlertConfirmBtn('OK');

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to sign up without username', () => {
    signUpPage.visit();

    signUpPage.signUpEmailField
      .type(user.email);
    signUpPage.signUpPasswordField
      .type(user.password);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Registration failed!');
    cy.getBySwalText('Username field required.');
    cy.sweetAlertConfirmBtn('OK');
  });

  it('should not provide an ability to sign up without email', () => {
    signUpPage.visit();

    signUpPage.signUpUsernameField
      .type(user.username);
    signUpPage.signUpPasswordField
      .type(user.password);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Registration failed!');
    cy.getBySwalText('Email field required.');
    cy.sweetAlertConfirmBtn('OK');
  });

  it('should not provide an ability to sign up without password', () => {
    signUpPage.visit();

    signUpPage.signUpUsernameField
      .type(user.username);
    signUpPage.signUpEmailField
      .type(user.email);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Registration failed!');
    cy.getBySwalText('Password field required.');
    cy.sweetAlertConfirmBtn('OK');
  });

  const invalidEmail = 'email1.com';
  const ivalidPassword = 'v111';

  it('should not provide an ability to sign up without valid email', () => {
    signUpPage.visit();

    signUpPage.signUpUsernameField
      .type(user.username);
    signUpPage.signUpEmailField
      .type(invalidEmail);
    signUpPage.signUpPasswordField
      .type(user.password);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Registration failed!');
    cy.getBySwalText('Email must be a valid email.');
    cy.sweetAlertConfirmBtn('OK');
  });

  it('should not provide an ability to sign up without valid password', () => {
    signUpPage.visit();

    signUpPage.signUpUsernameField
      .type(user.username);
    signUpPage.signUpEmailField
      .type(user.email);
    signUpPage.signUpPasswordField
      .type(ivalidPassword);
    signUpPage.signUpBtn.click();

    cy.getBySwalTitle('Registration failed!');
    cy.getBySwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.sweetAlertConfirmBtn('OK');
  });
});
