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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });


  it('should provide an ability to sign up with required credentials', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    
    homePage.modalWindow.should('contain', 'Welcome!');
  });

  it('should not provide an ability to sign up with empty username', () => {
    signUpPage.visit();
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.isRegistrationFailed();
    signUpPage.isUsernameRequired();
  });

  it('should not provide an ability to sign up with empty email', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.isRegistrationFailed();
    signUpPage.isEmailRequired();
  });

  
  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.signUpBtn.click();
    signUpPage.isRegistrationFailed();
    signUpPage.isPasswordRequired();
  });

  it('should not provide an ability to sign up with invalid email', () => {
    const invalidEmail = 'hello.com';
    
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(invalidEmail);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    homePage.modalWindow
      .should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to sign up with invalid password', () => {
    const invalidPassword = 'i';
    
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(invalidPassword);
    signUpPage.signUpBtn.click();
    homePage.modalWindow
      .should('contain', 'Password must be 8 characters');
  });
});