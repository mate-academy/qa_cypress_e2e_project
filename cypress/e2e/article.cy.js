/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article tests', () => {
  before(() => {
    cy.registerAndLogin('testuser', 'testuser@example.com', 'password123');
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login('testuser@example.com', 'password123');
    cy.visit('/');
  });

  it('should create a new article', () => {
    articlePage.visitNewArticle();
    articlePage.typeTitle('My Test Article');
    articlePage.typeDescription('Article description');
    articlePage.typeBody('This is the content of the article.');
    articlePage.publishArticle();
    articlePage.assertArticleExists('My Test Article');
  });

  it('should edit an article', () => {
    cy.createArticle('Original Article', 'Desc', 'Body');
    articlePage.editArticle();
    articlePage.typeTitle('Edited Article');
    articlePage.publishArticle();
    articlePage.assertArticleExists('Edited Article');
  });

  it('should delete an article', () => {
    cy.createArticle('Delete Me', 'Desc', 'Body');
    articlePage.deleteArticle();
    articlePage.assertArticleNotExists('Delete Me');
  });
});
