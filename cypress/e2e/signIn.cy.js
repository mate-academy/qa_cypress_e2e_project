/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Сторінка Входу', () => {
   const failedLogin = 'Login failed!';
   let user;
   beforeEach(() => {
      signInPage.visit();
      cy.task('db:clear');
      cy.task('generateUser').then(generateUser => {
         user = generateUser;
      });
   });

   it('користувач повинен мати можливість входу з існуючими обліковими даними', () => {
      cy.register().then(user => {
         signInPage.emailField.type(user.email);
         signInPage.passwordField.type(user.password);
         signInPage.signInBtn.click();
         homePage.usernameLink.should('contain', user.username);
      });
   });

   it(`сторінка входу повина мати 'Login form'`, () => {
      signInPage.emailField.should('exist');
      signInPage.passwordField.should('exist');
      signInPage.signInBtn.should('exist');
   });

   it('користувач не повинен мати можливість входу з неправильної адреси електронної пошти', () => {
      const errorMsg = 'Email must be a valid email.';
      cy.register().then(user => {
         signInPage.emailField.type(`123user.email`);
         signInPage.passwordField.type(user.password);
         signInPage.signInBtn.click();
         cy.get('.swal-title').should('contain.text', failedLogin);
         cy.get('.swal-text').should('contain.text', errorMsg);
      });
   });

   it('користувач не повинен мати можливість входу з неправильним паролем', () => {
      const errorMsg = 'Invalid user credentials.';
      cy.register().then(user => {
         signInPage.emailField.type(user.email);
         signInPage.passwordField.type(`432user.password`);
         signInPage.signInBtn.click();
         cy.get('.swal-title').should('contain.text', failedLogin);
         cy.get('.swal-text').should('contain.text', errorMsg);
      });
   });
});
