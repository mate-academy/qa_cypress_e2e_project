/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPage from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPage();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    signUpPage.visit();

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should register a new user successfully', () => {
    signUpPage.fillSignUpForm(user);

    cy.get('.swal-text')
      .should('contain.text', 'Your registration was successful!');
  });

  it('should show error for already existing email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.fillSignUpForm(user);

    cy.get('.swal-text')
      .should('contain.text', 'Email already taken.');
  });
});
