/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((u) => {
      user = u;
      cy.register(u.email, u.username, u.password);
    });
  });

  it('should login with valid credentials', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not login with wrong password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword123');
    signInPage.clickSignInBtn();

    cy.get('.swal-title')
      .should('contain', 'Login failed!');
  });
});
