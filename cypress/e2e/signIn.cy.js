/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import alertMessages from '../support/pages/alertMessagesPageObject';
// import * as alertMessage from '../support/alertMessages';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

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
    signInPage.typePassword(user.password);
    signInPage.typeEmail();
    signInPage.clickSignInBtn();
     signInPage.assertModalContent(alertMessages.loginFailedMessage);
     signInPage.assertModalContent(alertMessages.invalidEmailMessage);
    signInPage.clickOkBtn();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
   // signInPage.typePassword(user.updatedPassword);
    signInPage.clickSignInBtn();
     signInPage.assertModalContent(alertMessages.loginFailedMessage);
     signInPage.assertModalContent(alertMessages.invalidPasswordMessage);
    signInPage.clickOkBtn();
  });
});
