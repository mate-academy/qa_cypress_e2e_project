/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const singUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      singUpPage.visit();
    });
  });

  it('should sign up', () => {
    singUpPage.typeUsername(user.username);
    singUpPage.typeEmail(user.email);
    singUpPage.typePassword(user.password);
    singUpPage.clickSignUpBtn();
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  });

  it('should not sign up with invalid email', () => {
    singUpPage.typeUsername(user.username);
    singUpPage.typeEmail('WRONG-EMAIL');
    singUpPage.typePassword(user.password);
    singUpPage.clickSignUpBtn();
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  });
  it('should not sign up with invalid password', () => {
    singUpPage.typeUsername(user.username);
    singUpPage.typeEmail(user.email);
    singUpPage.typePassword('TEST-WRONG-PASSWORD');
    singUpPage.clickSignUpBtn();
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
