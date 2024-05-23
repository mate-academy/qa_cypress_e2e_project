/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import 'cypress-network-idle';

const articlePage = new ArticlePageObject();

describe('Article page', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.createArticle(
      article.title, article.description, article.body, article.tag);
    cy.url().should('include', article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit();
    articlePage.createArticle(
      article.title, article.description, article.body, article.tag);
    articlePage.clickEditArticle();
    articlePage.editArticle();
    cy.url().should('include', article.title);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit();
    articlePage.createArticle(
      article.title, article.description, article.body, article.tag);
    articlePage.clickDeteleArticle();
  });
});
