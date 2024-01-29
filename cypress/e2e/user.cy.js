/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;
  let user2;
  let article;
  let slug2;
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
        cy.createArticle(article).then((slug) => {
          slug2 = slug;
        });
      });
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.visit(`/#/articles/` + slug2);
    cy.get('[data-cy="followuser-button"]').first().click();
    cy.get('[data-cy="followuser-button"]')
      .should('contain', 'Follow ' + user.username);
  });

  it.only('should be able to unfollow the another user', () => {
    cy.visit(`/#/articles/` + slug2);
    cy.get('[data-cy="followuser-button"]')
      .should('contain', 'Follow ' + user.username);
    cy.get('[data-cy="followuser-button"]').first().click();
    cy.get('[data-cy="followuser-button"]')
      .should('contain', 'Follow ' + user.username);
    cy.get('[data-cy="followuser-button"]').first().click();
    cy.get('[data-cy="followuser-button"]')
      .should('contain', 'Unfollow ' + user.username);
  });
});
