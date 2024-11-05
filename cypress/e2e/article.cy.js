/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const ArticlePage = new ArticlePageObject();
describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user);
      cy.task('generateArticle').then((data) => {
        article = data;
        cy.visit('/#/editor');
      });
    });
  });

  it('should be created using New Article form', () => {
    ArticlePage.createArticle(article);
  });

  it('should be edited using Edit button', () => {
    ArticlePage.createArticle(article);
    cy.task('generateArticle').then((newArticle) => {
      ArticlePage.editArticle(article.title, newArticle);
    });
  });

  it('should be deleted using Delete button', () => {
    ArticlePage.createArticle(article);
    ArticlePage.deleteArticleButton.click();
    cy.contains('Deleted the article. Going home...');
  });
});
