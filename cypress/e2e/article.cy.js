/// <reference types='cypress' />
/// <reference types='../support' />
import { ArticlePageObject } from '../support/pages/article.pageObject';

describe('Article', () => {
  const articlePage = new ArticlePageObject();
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();
    articlePage.articleTitleField.type(article.title);
    articlePage.aboutField.type(article.description);
    articlePage.articleField.type(article.body);
    articlePage.tagField.type(article.tag);
    articlePage.publishButton.click();
    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();
    articlePage.articleTitleField.type(article.title);
    articlePage.aboutField.type(article.description);
    articlePage.articleField.type(article.body);
    articlePage.tagField.type(article.tag);
    articlePage.publishButton.click();
    articlePage.editButton.click();
    articlePage.articleTitleField.type('test1');
    articlePage.aboutField.type('test1');
    articlePage.articleField.type('test1');
    articlePage.tagField.type('test1');
    articlePage.publishButton.click();
    cy.get('h1').should('contain', 'test1');
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();
    articlePage.articleTitleField.type(article.title);
    articlePage.aboutField.type(article.description);
    articlePage.articleField.type(article.body);
    articlePage.tagField.type(article.tag);
    articlePage.publishButton.click();
    articlePage.deleteButton.click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
