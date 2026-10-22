/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should display another user profile', () => {
    cy.task('generateUser').then((follower) => {
      return cy.task('generateUser').then((author) => {
        cy.register(follower.email, follower.username, follower.password);
        cy.register(author.email, author.username, author.password);

        cy.visit('/#/login');

        cy.get('[data-cy="email-sign-in"]').type(follower.email);
        cy.get('[data-cy="password-sign-in"]').type(follower.password);
        cy.get('[data-cy="sign-in-btn"]').click();

        cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
          'contain',
          follower.username
        );

        cy.visit(`/#/@${author.username}`);

        cy.contains('h4', author.username, { timeout: 10000 }).should(
          'be.visible'
        );

        cy.contains('button', `Follow ${author.username}`).should('be.visible');
      });
    });
  });
});
