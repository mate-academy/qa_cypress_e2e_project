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
    // cy.task('generateUser').then((generateUser) => {
    //   user = generateUser;
    // cy.register(user.username, user.email, user.password);
    // });
    signInPage.visit();
  });

  it('should provide the ability to log in with existing credentials', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide the ability to log in with wrong email', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.typeEmail(user.otherEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertInvalid();
  });

  it('should not provide the ability to log in with wrong password', () => {
    cy.register(user.username, user.email, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.otherPassword);
    signInPage.clickSignInBtn();
    signInPage.assertInvalid();
  });
});
