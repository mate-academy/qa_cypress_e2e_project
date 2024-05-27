/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const SignUppage = new SignUpPageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should allow user to create new account', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UserNameField();
    SignUppage.MailField();
    SignUppage.PasswordField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationPassedAssert();
  });

  it('should not allow user to create accout with invlid username', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UsernameInvalid();
    SignUppage.SecondEmail();
    SignUppage.PasswordField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });

  it('should not allow user to create account with invalid email', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UserNameField();
    SignUppage.MailInvalid();
    SignUppage.PasswordField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });

  it('should not allow user to create account with invalid password', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UserNameField();
    SignUppage.MailField();
    SignUppage.PasswordInvalid();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });

  it('should not allow user to create account without filling password', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UserNameField();
    SignUppage.MailField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });

  it('should not allow user to create account without filling Email', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.UserNameField();
    SignUppage.PasswordField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });

  it('should not allow user to create account without filling username', () => {
    cy.visit('/#/');
    SignUppage.SignUpbtn();
    SignUppage.MailField();
    SignUppage.PasswordField();
    SignUppage.clickSignUpBtn();
    SignUppage.registrationFailedAssert();
  });
});
