/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;

  before(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.createArticle(article.title, article.description, article.body);
    articlePage.assertArticleCreated(article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.editArticle(article.title, article.description, article.body);
    articlePage.assertArticleEdited(article.title);
  });

  it('should be deleted using Delete button', () => {
    articlePage.deleteArticle(article.title);
    articlePage.assertArticleDeleted(article.title);
  });
});
