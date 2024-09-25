
/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePage from '../support/pages/articlePage';

describe('Article', () => {
  const articlePage = new ArticlePage();
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.findByPlaceholder('Username').type(user.username);
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type(user.password);
      cy.contains('button', 'Sign up').click();
      cy.contains('button', 'OK').click();
    });
    cy.url().should('include', '/');
    cy.findByTestID('new-article-nav').click();
  });

  it('should create a new article', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeDescription(article.description);
      articlePage.typeBody(article.body);
      articlePage.typeTag(article.tag);
      articlePage.clickPublish();
      cy.url().should('include', '#/articles/');
      articlePage.assertArticleTitleExists(article.title);
    });
  });

  it('should be edited using the Edit button', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeDescription(article.description);
      articlePage.typeBody(article.body);
      articlePage.typeTag(article.tag);
      articlePage.clickPublish();
      cy.url().should('include', '#/articles/');
      articlePage.assertArticleTitleExists(article.title);
      articlePage.clickEditArticleBtn();
      articlePage.typeTitle('Edited Article Title');
      articlePage.clickPublish();
      articlePage.assertArticleTitleExists('Edited Article Title');
    });
  });

  it('should be deleted using the Delete button', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeDescription(article.description);
      articlePage.typeBody(article.body);
      articlePage.typeTag(article.tag);
      articlePage.clickPublish();
      cy.url().should('include', '#/articles/');
      articlePage.assertArticleTitleExists(article.title);
      articlePage.clickDeleteArticleBtn();
      articlePage.assertArticleTitleDoesNotExist();
    });
  });
});
