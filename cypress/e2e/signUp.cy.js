/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
/*
  const wrongData = {
    email: "greg14938.com",
    password: "hello123",
  };
*/
  before(() => {
   // cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.checkSuccessMessage();
  });

  it('should not provide an ability to sign up with empty username field', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.checkErrorNameRequired();
  }); 

  it('should not provide an ability to sign up with empty email field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.checkErrorEmailRequired();
  }); 

  it('should not provide an ability to sign up with empty password field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.checkErrorPasswordRequired();
  }); 

});
