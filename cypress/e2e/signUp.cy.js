/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  before(() => {
  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
        user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    homePage.modalWindow.should('contain', 'Welcome!');
  });

  it('should not provide an ability to register with invalid email', () => {
    const invalidEmail = 'Dzhul@gmail';

    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(invalidEmail);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    homePage.modalWindow.should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to register with invalid password', () => {
    const invalidPassword = '12345!'

    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(invalidPassword);
    signUpPage.signUpBtn.click();
    homePage.modalWindow.should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter');
  });
});
