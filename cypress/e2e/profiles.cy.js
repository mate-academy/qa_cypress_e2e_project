/// <reference types="cypress" />

describe('Profiles Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('follows and unfollows a user', () => {
    cy.createUser().then((user1) => {
      cy.createUser().then((user2) => {
        cy.visit('/login');
        cy.get('input[name=email]').type(user1.email);
        cy.get('input[name=password]').type(user1.password);
        cy.get('form').submit();

        cy.visit('/profile/' + user2.username);
        cy.get('.follow-btn').click();
        cy.get('.follow-btn').should('contain', 'Unfollow');

        cy.get('.follow-btn').click();
        cy.get('.follow-btn').should('contain', 'Follow');
      });
    });
  });
});
