/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
  });

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signUpPage.clickOkBtn();

    homePage.assertHeaderDoesntContainUsername();
  });

  it('should not provide ability to log in with empty password field', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signUpPage.clickOkBtn();

    homePage.assertHeaderDoesntContainUsername();
  });

  it('should not provide an ability to log in with empty email field', () => {
    signInPage.visit();

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signUpPage.clickOkBtn();

    homePage.assertHeaderDoesntContainUsername();
  });
});
