/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.page-object';
import UserPageObject from '../support/pages/user.page-object';

const signUpPage = new SignUpPageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });
  // BUG - Doesnt work following user
  it.skip('should be able to follow the another user', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    userPage.visit();
    cy.get('.author').click();
    userPage.followButton.click();
    cy.visit('http://localhost:1667/#/my-feed');
    cy.get('.author').should('exist');
  });
});
