/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
  });

  it('should provide the ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide the ability to log in with wrong email', () => {
    signInPage.typeEmail(user.invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidEmail();
  });

  it('should not provide the ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.invalidPassword);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidPassword();
  });
});
