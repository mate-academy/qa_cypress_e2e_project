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
    cy.register();
    signInPage.visit();

    signInPage.emailField
      .type('riot@qa.team');
    signInPage.passwordField
      .type('12345Qwert!');
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', 'riot');
  });

  it.only('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type('12345Qwert!');
    signInPage.signInBtn
      .click();
    signInPage.checkFailedSignIn();
    signInPage.closeModalWindow();
  });
});
