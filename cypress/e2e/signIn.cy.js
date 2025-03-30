/* eslint-disable max-len */
import HomePageObject from '../support/pages/home.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

let user;

/// <reference types='cypress' />
/// <reference types='../support' />

describe('signIn', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/');
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.goToSignInPage();
    signInPage.assertSignInPageURL();
    signInPage.signInForTests(user.email, user.password);

    signInPage.assertAfterLoginByUsername(user.username);
  });

  it('should not provide an ability to log in with wrong Email', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.goToSignInPage();
    signInPage.assertSignInPageURL();
    signInPage.signInForTests('wrong ' + user.email, user.password);

    homePage.assertErrorMassage(`Email must be a valid email.`);
  });

  it('should not provide an ability to log in with wrong Password', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.goToSignInPage();
    signInPage.assertSignInPageURL();
    signInPage.signInForTests(user.email, 'wrong ' + user.password);

    homePage.assertErrorMassage(`Invalid user credentials.`);
  });

  it('should not provide an ability to log in with empty Email field', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.goToSignInPage();
    signInPage.assertSignInPageURL();
    signInPage.signInWithEmptyEmail(user.password);

    homePage.assertErrorMassage(`Email field required.`);
  });

  it('should not provide an ability to log in with empty Password field', () => {
    signInPage.registerOnly(user.email, user.username, user.password);
    homePage.goToSignInPage();
    signInPage.assertSignInPageURL();
    signInPage.signInWithEmptyPassword(user.email);

    homePage.assertErrorMassage(`Password field required.`);
  });
});
