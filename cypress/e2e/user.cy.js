/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User', () => {
  it('should follow and unfollow another user', () => {
    cy.task('db:clear');

    cy.task('generateUser').then((currentUser) => {
      cy.task('generateUser').then((targetUser) => {
        cy.register(
          currentUser.email,
          currentUser.username,
          currentUser.password
        );

        cy.register(
          targetUser.email,
          targetUser.username,
          targetUser.password
        );

        signInPage.visit();
        signInPage.typeEmail(currentUser.email);
        signInPage.typePassword(currentUser.password);
        signInPage.clickSignInBtn();

        cy.visit(`/#/@${targetUser.username}`);

        cy.contains('button', `Follow ${targetUser.username}`)
          .should('be.visible')
          .click();

        cy.contains('button', `Unfollow ${targetUser.username}`)
          .should('be.visible')
          .click();

        cy.contains('button', `Follow ${targetUser.username}`)
          .should('be.visible');
      });
    });
  });
});
