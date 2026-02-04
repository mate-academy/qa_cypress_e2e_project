/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User follow flow', () => {
  let target;
  let follower;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((u1) => {
      target = u1;
      cy.register(u1.email, u1.username, u1.password);
    });

    cy.task('generateUser').then((u2) => {
      follower = u2;
      cy.register(u2.email, u2.username, u2.password);
    });
  });

  it('should follow and unfollow user', () => {
    signInPage.visit();
    signInPage.typeEmail(follower.email);
    signInPage.typePassword(follower.password);
    signInPage.clickSignInBtn();

    cy.visit(`/#/@${target.username}`);

    cy.getByDataQa('follow-btn')
      .should('contain', 'Follow')
      .click();

    cy.getByDataQa('follow-btn')
      .should('contain', 'Unfollow')
      .click();

    cy.getByDataQa('follow-btn')
      .should('contain', 'Follow');
  });
});
