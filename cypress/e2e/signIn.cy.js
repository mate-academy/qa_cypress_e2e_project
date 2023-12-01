/// <reference types='cypress' />
/// <reference types='../support' />

import { SignInPageObject } from '../support/pages/signIn.pageObject';
import { HomePageObject } from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with invalid email', () => {
    signInPage.typeEmail(user.anotherEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidCredentials();
  });

  it('should not provide an ability to log in with invalid password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.anotherPassword);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidCredentials();
  });
});

