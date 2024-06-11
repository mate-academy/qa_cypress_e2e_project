/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import alertMessages from '../support/pages/alertMessages.PageObject';
// import * as alertMessage from '../support/alertMessages';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const wrongEmail = '5555getParsedCommandLineOfConfigFile.com';

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.get('.navbar-brand').should('contain','conduit');
    cy.get('h1.text-xs-center').should('contain','Sign in');
    cy.get('p.text-xs-center > a').should('contain','Need an account?');
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    signInPage.typePassword(user.password);
    //signInPage.typeEmail();
    signInPage.typeEmail(wrongEmail);
    signInPage.clickSignInBtn();
     signInPage.assertModalContent('Login failed!');
     signInPage.assertModalContent('Email must be a valid email.');
    signInPage.clickOkBtn();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
   // signInPage.typePassword(user.updatedPassword);
    signInPage.clickSignInBtn();
     signInPage.assertModalContent('Login failed!');
     //signInPage.assertModalContent('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    signInPage.clickOkBtn();
  });
});
