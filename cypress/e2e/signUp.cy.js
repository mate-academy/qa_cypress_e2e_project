/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.page-object';

const signUpPage = new SignUpPageObject();
describe('Sign Up page', () => {
  let user;
  before(() => {
    cy.task('db:clear');
  });
  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-title').should('contain', 'Welcome!');
  });

  it('should not provide an ability to sign up without email', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.invalidEmail);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-title').should('contain', 'Registration failed!');
  });
});
