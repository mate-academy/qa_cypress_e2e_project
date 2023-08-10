/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.fillLoginCredentials(user.email, user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    const userEmail = '77' + user.email;
    signInPage.fillLoginCredentials(userEmail, user.password);
    signInPage.clickSignInBtn();

    cy.contains(loginFailedMessage);
    cy.contains(invalidUserCredentialsMessage);
    cy.contains(confirmationMessage).click();
  });

  it('should not provide an ability to log in with wrong password', () => {
    const userPassword = '77' + user.password;
    signInPage.fillLoginCredentials(user.email, userPassword);
    signInPage.clickSignInBtn();

    cy.contains(loginFailedMessage);
    cy.contains(invalidUserCredentialsMessage);
    cy.contains(confirmationMessage).click();
  });
});
