/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.generateAndRegisterUser().then((generatedUser) => {
      user = generatedUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in without email', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });

  it('should not provide an ability to log in without password', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });

  it('should not provide an ability to log in with username', () => {
    signInPage.typeEmail(user.username);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });

  it('should not provide an ability to log in with the blank fields', () => {
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });

  it('should not provide an ability to log in with the wrong email', () => {
    signInPage.typeEmail(`${user.email} test`);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });

  it('should not provide an ability to log in with the wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${user.password} test`);
    signInPage.clickSignInBtn();
    signInPage.assertModal();
  });
});
