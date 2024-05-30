/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit('#/login');
    cy.login(user.username, user.email, user.password);
    cy.log('Typing password');
    signInPage.typePassword(user.password);
    cy.log('Visiting login page and typing email');
    signInPage.typeEmail(user.email);
    cy.log('Clicking sign in button');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in without email field', () => {
    signInPage.visit('#/login');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should not provide an ability to log in without password field', () => {
    signInPage.visit('#/login');
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
  });
});
