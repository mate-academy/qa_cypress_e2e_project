/// <reference types='cypress' />
/// <reference types='../support' />

import { articlePage } from '../support/pages/ProjectPages/ArticlePage';

describe('Article page', () => {
  let user;
  let article;
  let editArticle;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(5);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateeditArticle').then((generateeditArticle) => {
      editArticle = generateeditArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/editor');
    articlePage.typeArticleTitle(article);
    articlePage.typeArticleDescription(article);
    articlePage.typeArticleBody(article);
    articlePage.typeArticleTags(article);
    articlePage.createArticleBtn();
    articlePage.assertArticleTitle(article);
    articlePage.assertArticleBody(article);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      )
        .then((response) => {
          const slug = response.body.article.slug;
          cy.visit(`/#/articles/${slug}`);
        });
    });
    articlePage.editArticleBtn();
    articlePage.typeArticleTitle(editArticle);
    articlePage.typeArticleDescription(editArticle);
    articlePage.typeArticleBody(editArticle);
    articlePage.typeArticleTags(editArticle);
    articlePage.createArticleBtn();
    articlePage.assertArticleTitle(editArticle);
    articlePage.assertArticleBody(editArticle);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      )
        .then((response) => {
          const slug = response.body.article.slug;
          cy.visit(`/#/articles/${slug}`);
        });
    });
    articlePage.deleteArticleBtn();
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
