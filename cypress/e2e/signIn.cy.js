/* eslint-disable max-len */
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
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should log in with correct credentials', () => {
    signInPage.visitPage();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not log in with wrong credentials', () => {
    signInPage.visitPage();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword');
    signInPage.clickSignInBtn();

    cy.get('[data-qa="error-messages"]').should('contain.text', 'email or password is invalid');
  });
});
