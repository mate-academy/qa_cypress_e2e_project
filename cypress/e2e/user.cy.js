/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('User', () => {
  let user1, user2, article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser1) => {
      user1 = generateUser1;
      cy.register(user1.email, user1.username, user1.password);
      cy.signIn(user1.email, user1.password);
    });

    cy.task('generateArticle').then((articleData) => {
      article = articleData;
      cy.createArticle(article.title, article.description, article.body, article.tag);
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow another user', () => {
    cy.visit(`/profile/${user2.username}`);
    cy.contains('Follow').click();
  });
});