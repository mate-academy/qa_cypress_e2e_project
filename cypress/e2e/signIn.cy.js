/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let wrongUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateWrongUser').then((generateWrongUser) => {
      wrongUser = generateWrongUser;
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
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(wrongUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.verifyEmailErorr();

  });

  it('should not provide an ability to log in with wrong password', () => {

    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongUser.password);
    signInPage.clickSignInBtn();

    signInPage.verifyPasswordErorr();
  });
});
