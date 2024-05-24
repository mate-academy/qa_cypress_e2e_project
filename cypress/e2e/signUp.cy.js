/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const SignUppage = new SignUpPageObject();

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
  });

  it('should allow user to create new account', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUserNameField();
    SignUppage.fillMailField();
    SignUppage.fillPasswordField();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create accout with invlid username', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUsernameInvalid();
    SignUppage.fillMailField();
    SignUppage.fillPasswordField();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create account with invalid email', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUserNameField();
    SignUppage.fillMailInvalid();
    SignUppage.fillPasswordField();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create account with invalid password', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUserNameField();
    SignUppage.fillMailField();
    SignUppage.fillPasswordInvalid();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create account without filling password', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUserNameField();
    SignUppage.fillMailField();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create account without filling Email', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillUserNameField();
    SignUppage.fillPasswordField();
    SignUppage.clickSignUpBtn();
  });

  it('should not allow user to create account without filling username', () => {
    cy.visit('/#/');
    SignUppage.SignUpLinkbtn();
    SignUppage.fillMailField();
    SignUppage.fillPasswordField();
    SignUppage.clickSignUpBtn();
  });
});
