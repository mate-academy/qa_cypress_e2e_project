/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const SignUppage = new SignUpPageObject();

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
  });

  it('should allow user to create new account', () => {
    cy.visit('/#/register/');
    SignUppage.fillUserNameField();
    SignUppage.fillMailField();
    SignUppage.fillPasswordField();
  });
});
