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
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
    });
  });

  it('should provide an ability to log in with existing credentials',
    function() {
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.assertHeaderContainUsername(user.username);
    });

  it('should not provide an ability to log in with wrong credentials',
    function() {
      signInPage.typeEmail(user.email + 'not');
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      signInPage.verifyLoginFailedTitle();
    });
});
