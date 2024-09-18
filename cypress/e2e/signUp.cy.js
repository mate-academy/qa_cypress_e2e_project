/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').as('user');

    signUpPage.visit();
  });

  it('should provide an ability to register user', function() {
    cy.get('@user').then(({ username, email, password }) => {
      signUpPage.typeUsername(username);
      signUpPage.typeEmail(email);
      signUpPage.typePassword(password);
      signUpPage.clickSignUpBtn();
      signUpPage.checkModalTitle('Welcome!');
    });
  });

  it('should not allow to register user without username',
    function() {
      cy.get('@user').then(({ email, password }) => {
        signUpPage.typeEmail(email);
        signUpPage.typePassword(password);
        signUpPage.clickSignUpBtn();
        signUpPage.checkModalTitle('Registration failed!');
      });
    });

  it('should not allow to register user without email',
    function() {
      cy.get('@user').then(({ username, password }) => {
        signUpPage.typeUsername(username);
        signUpPage.typePassword(password);
        signUpPage.clickSignUpBtn();
        signUpPage.checkModalTitle('Registration failed!');
      });
    });

  it('should not allow to register user without a password',
    function() {
      cy.get('@user').then(({ username, email }) => {
        signUpPage.typeUsername(username);
        signUpPage.typeEmail(email);
        signUpPage.clickSignUpBtn();
        signUpPage.checkModalTitle('Registration failed!');
      });
    });

  it('should not allow register with an existed email',
    function() {
      cy.get('@user').then(({ username, email }) => {
        signUpPage.typeUsername(username + '-new');
        signUpPage.typeEmail(email);
        signUpPage.clickSignUpBtn();
        signUpPage.checkModalTitle('Registration failed!');
      });
    });
});
