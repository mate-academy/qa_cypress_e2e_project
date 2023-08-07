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
    homePage.assertHomePageUrl();
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow();
    signInPage.assertInvalidEmailMessage();
    signInPage.closeModalWindow();
  });

  it('should not provide an ability to log in without an email', () => {
    signInPage.visit();

    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow();
    signInPage.assertEmptyEmailMessage();
    signInPage.closeModalWindow();
  });

  it('should not provide an ability to log in without a password', () => {
    signInPage.visit();

    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow();
    signInPage.assertEmptyPasswordMessage();
    signInPage.closeModalWindow();
  });
});
