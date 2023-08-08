/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.username, user.email, user.password);
    cy.getCyData('settings-link').click();
    cy.getCyData('Logout button').click();
    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with empty email field', () => {
    signInPage.visit();
    signInPage.typeEmail(' ');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.get('.swal-modal').contains('Login failed!');
    cy.get('.swal-modal').contains('Email must be a valid email.');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/login');
  });

  it('should not provide an ability to log in with non-existing email', () => {
    signInPage.visit();
    signInPage.typeEmail('bobrpoland111111@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.get('.swal-modal').contains('Login failed!');
    cy.get('.swal-modal').contains('Invalid user credentials.');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/login');
  });


  it('should not provide an ability to log in with empty password field', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(' ');
    signInPage.clickSignInBtn();
    cy.get('.swal-modal').contains('Login failed!');
    cy.get('.swal-modal').contains('Invalid user credentials.');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/login');
  });

  it('should not provide an ability to log in with invalid password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('dobro12345');
    signInPage.clickSignInBtn();
    cy.get('.swal-modal').contains('Login failed!');
    cy.get('.swal-modal').contains('Invalid user credentials.');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/login');
  });
});
