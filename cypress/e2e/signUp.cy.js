/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject;
const homePage = new HomePageObject;

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    signUpPage.visit();
    });
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    
    signUpPage.successSignUp();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
  
    signUpPage.failedSignUp();
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
  
  });

  it('should not provide an ability to sign up with empty email field', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
  
    signUpPage.failedSignUp();
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
  });

  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.signUpBtn.click();
  
    signUpPage.failedSignUp();
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');  
  });
  
  it('should not provide an ability to sign up with all empty fields', () => {
    signUpPage.signUpBtn.click();

    signUpPage.failedSignUp();  
  });
});
