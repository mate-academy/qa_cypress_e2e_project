/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    const wrongEmail = 'wrongemail@example.com';
    const wrongPassword = 'wrongpassword';

    signInPage.emailField.type(wrongEmail);
    signInPage.passwordField.type(wrongPassword);
    signInPage.signInBtn.click();

    cy.get('.swal-text').should('contain', 'Invalid user credentials.');

    homePage.usernameLink.should('not.exist');
  });
});
