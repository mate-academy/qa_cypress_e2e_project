/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import userGenerator from '../plugins/userGenerator';
import {
  loginFailedMessage,
  invalidUserCredentialsMessage,
  confirmationMessage
} from '../plugins/alertMessages';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    user = userGenerator.generateUser();
    signInPage.visit();
    cy.registerUser({
      email: user.email,
      username: user.username,
      password: user.password
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeLoginCredentials(user.email, user.password);
    signInPage.clickOnSignInButton();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    const userEmail = '77' + user.email;
    signInPage.typeLoginCredentials(userEmail, user.password);
    signInPage.clickOnSignInButton();

    cy.get('.swal-title')
      .should('be.visible')
      .and('contain', loginFailedMessage);
    cy.get('.swal-text')
      .should('be.visible')
      .and('contain', invalidUserCredentialsMessage);
    cy.get('.swal-button--confirm')
      .should('be.visible')
      .and('contain', confirmationMessage)
      .click();
  });

  it('should not provide an ability to log in with wrong password', () => {
    const userPassword = '77' + user.password;
    signInPage.typeLoginCredentials(user.email, userPassword);
    signInPage.clickOnSignInButton();

    cy.get('.swal-title')
      .should('be.visible')
      .and('contain', loginFailedMessage);
    cy.get('.swal-text')
      .should('be.visible')
      .and('contain', invalidUserCredentialsMessage);
    cy.get('.swal-button--confirm')
      .should('be.visible')
      .and('contain', confirmationMessage)
      .click();
  });
});
