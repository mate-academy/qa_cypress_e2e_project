/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

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

  it('should not provide an ability to log in with wrong email', () => {
    const invalidEmail = 'invalidtestemail@mail.com';
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidLogin();
  });

  it('should not provide an ability to log in with wrong password', () => {
    const invalidPassword = 'invalidPassword1!';
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(invalidPassword);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidLogin();
  });

  it('should not provide an ability to log in with empty email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertLoginWithEmptyEmailField();
  });
  it('should not provide an ability to log in with empty password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertLoginWithEmptyPasswordField();
  });
});
