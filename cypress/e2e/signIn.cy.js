/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;
  let errMsg = 'Invalid user credentials.';

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    cy.registerNew(user.username, user.email, user.password);
    });
  })

  beforeEach(() => {
    signInPage.visit();
  });
  
  it('should provide an ability to log in with existing credentials', () => {

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong password', () => {

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(`${user.password}1`);
    signInPage.signInBtn
      .click();

    signInPage.modalWind 
      .should('contain', errMsg);

    cy.url()
      .should('contain', '/login');
  });

  it('should not provide an ability to log in with wrong email', () => {

    signInPage.emailField
      .type(`${user.email}m`);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();
    
    signInPage.modalWind 
      .should('contain', errMsg);

    cy.url()
      .should('contain', '/login');
  });
});
