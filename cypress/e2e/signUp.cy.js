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
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an abiity to register user', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to sign up with wrong credentials', () => {
    signUpPage.visit();
      cy.register(user.email, user.username, user.password);
    
    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.username);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.signUpBtn
      .click();
  
    signUpPage.signUpFailedMessage
      .should('contain', 'Registration failed!'); //
    });
});
