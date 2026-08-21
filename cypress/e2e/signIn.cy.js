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
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      return cy.register(user.email, user.username, user.password);
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.signIn(user.email, user.password);

    homePage.assertHeaderContainUsername(user.username);
    signInPage.assertUrlIncludes('/#/');
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.signIn(user.email, `${user.password}wrong`);

    signInPage.assertLoginFailed('Invalid user credentials.');
    signInPage.assertUrlIncludes('/#/login');
  });
});
