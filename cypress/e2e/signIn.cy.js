/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

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
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with unregister password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword('passWord1!');
    signInPage.clickSignInBtn();
    signInPage.errorTitle();
    signInPage.errorInvalidCredentials();
    signInPage.closeAlert();
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.errorTitle();
    signInPage.errorInvalidCredentials();
    signInPage.closeAlert();
  });

  it('should not provide an ability to log in without email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.errorTitle();
    signInPage.errorEmailRequired();
    signInPage.closeAlert();
  });

  it('should not provide an ability to log in without password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.errorTitle();
    signInPage.errorPasswordRequired();
    signInPage.closeAlert();
  });
});
