/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let user2;

  before(() => {
    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with unregistered email', () => {
    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidLogin();
  });

  it('should not provide an ability to log in with blank email', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertRequiredEmail();
  });

  it('should not allow to log in with unregistered password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user2.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalidLogin();
  });

  it('should not provide an ability to log in with blank password', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertRequiredPassword();
  });
});
