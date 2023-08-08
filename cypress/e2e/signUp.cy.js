/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide the ability to sign up with valid credentials.', () => {
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Welcome!');
  });

  it('should not provide an ability to sign up with invalid email', () => {
    const invalidEmail = 'invalidemail.com';
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(invalidEmail);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to sign up with invalid password', () => {
    const invalidPassword = 'i';
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(invalidPassword);
    signUpPage.signUpBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Password must be 8 characters');
  });

  it('should not provide an ability to sign up with empty username', () => {
    const invalidUsername = '1';
    signUpPage.usernameField
      .type(invalidUsername);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Username field required.');
  });
});
