/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const testData = {
  password: '1234567890',
  email: faker.name.lastName().toLowerCase()
};

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to register with valid data', () => {
    signUpPage.visit();
    signUpPage.userNameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUnBtn.click();

    homePage.checkRegistration();
    signUpPage.closeModalWindow();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to register with empty username field', () => {
    signUpPage.visit();
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUnBtn.click();

    signUpPage.modalWindow.should('contain', 'Username field required.');
    signUpPage.closeModalWindow();
  });

  it('should not provide an ability to register with empty email field', () => {
    signUpPage.visit();
    signUpPage.userNameField.type(user.username);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUnBtn.click();

    signUpPage.modalWindow.should('contain', 'Email field required.');
    signUpPage.closeModalWindow();
  });

  it('should not provide an ability to register with empty password field', () => {
    signUpPage.visit();
    signUpPage.userNameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.signUnBtn.click();

    signUpPage.modalWindow.should('contain', 'Password field required.');
    signUpPage.closeModalWindow();
  });

  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.visit();
    signUpPage.userNameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(testData.password);
    signUpPage.signUnBtn.click();

    signUpPage.modalWindow.should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    signUpPage.closeModalWindow();
  });

  it('should not provide an ability to register with invalid email', () => {
    signUpPage.visit();
    signUpPage.userNameField.type(user.username);
    signUpPage.emailField.type(testData.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUnBtn.click();

    signUpPage.modalWindow.should('contain', 'Email must be a valid email.');
    signUpPage.closeModalWindow();
  });
});
