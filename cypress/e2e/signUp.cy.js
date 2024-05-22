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
  });
});
