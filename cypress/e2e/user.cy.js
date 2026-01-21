/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User', () => {
  let userTarget;
  let userFollower;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      userTarget = generateUser;
      cy.register(userTarget.email, userTarget.username, userTarget.password);
    });

    cy.task('generateUser').then((generateUser) => {
      userFollower = generateUser;
      const { email, username, password } = userFollower;
      cy.register(email, username, password);
    });
  });

  it('should be able to follow and unfollow another user', () => {
    signInPage.visit();
    signInPage.typeEmail(userFollower.email);
    signInPage.typePassword(userFollower.password);
    signInPage.clickSignInBtn();

    cy.url().should('include', '/#/');
    cy.visit(`/#/@${userTarget.username}`);
    cy.get('[data-qa="follow-btn"]').should('be.visible');

    cy.get('[data-qa="follow-btn"]').click();
    cy.get('[data-qa="follow-btn"]').should('not.exist');
    cy.get('[data-qa="unfollow-btn"]').should('be.visible').and('contain', `Unfollow ${userTarget.username}`);

    cy.get('[data-qa="unfollow-btn"]').click();
    cy.get('[data-qa="unfollow-btn"]').should('not.exist');
    cy.get('[data-qa="follow-btn"]').should('be.visible').and('contain', `Follow ${userTarget.username}`);
  });
});
