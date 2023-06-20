/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();

    articlePage.titleField
      .type(article.title);
    articlePage.descriptionField
      .type(article.description);
    articlePage.bodyField
      .type(article.body);
    articlePage.publishArticleBtn
      .click();

    cy.url()
      .should('include', `articles/${article.title}`);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body);

    articlePage.editArticleBtn
      .first().click();
    articlePage.titleField
      .type(`{selectAll}${article.newTitle}`);
    articlePage.publishArticleBtn
      .click();

    articlePage.articlePageTitle
      .should('contain', article.newTitle);
    cy.url()
      .should('include', `articles/${article.newTitle}`);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body);

    articlePage.deleteArticleBtn
      .first().click();

    homePage.articlePreview
      .should('contain', 'No articles are here... yet.');
  });
});
