/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with existing credentials', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    signUpPage.typeEmail(user.email);
    signUpPage.typeusername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signUpPage.visit();
    signUpPage.typeEmail('wrongEmail');
    signUpPage.typeusername('wrong');
    signUpPage.typePassword('wrong');
    signUpPage.clickSignUpBtn();
    cy.get('.swal-modal').should('contain', 'Registration failed!');
  });
});
