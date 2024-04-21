/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('Sign In page', () => {
  before(() => {
    cy.task('db:clear');
    cy.register();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.signIn();
    cy.get('[data-cy="username-link"]').contains('riot');
  });

  // eslint-disable-next-line max-len
  it.only('should not provide an ability to log in with wrong credentials', () => {
    cy.visit('#/login');

    signInPage.typeEmail();
    signInPage.typeInvalidPassword();
    signInPage.clickSignInBtn();
    signInPage.assertLoginFailed();
    signInPage.assertInvalidCreds();
  });
});
