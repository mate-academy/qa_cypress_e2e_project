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
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
     homePage.assertHeaderContainUsername(user.username);
   });

   it.only('should not provide an ability to log in with wrong email', () => {
     signInPage.visit();
     cy.register(user.email, user.username, user.password);

     signInPage.typeEmail(user.invalidEmail);
     signInPage.typePassword(user.password);
     signInPage.clickSignInBtn();

     signInPage.assertErrorMessage('Email must be a valid email.');
   });

   it.only('should not provide an ability to log in with wrong password', () => {
     cy.task('db:clear');
     signInPage.visit();
     cy.register(user.email, user.username, user.password);

     signInPage.typeEmail(user.email);
     signInPage.typePassword(user.shortPassword);
     signInPage.clickSignInBtn();

     signInPage.assertErrorMessage('Invalid user credentials.');
   });
 });