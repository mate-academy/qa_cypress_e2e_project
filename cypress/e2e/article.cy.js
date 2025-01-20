/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject.js';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generateUser) => {
        const { email, username, password } = generateUser;
        cy.login(email, username, password).then(() => generateUser);
      })
      .as('user');

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    articlePage.visit();
  });

  it('should be created using New Article form', function () {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    article.tagList.forEach((tag) => {
      articlePage.typeTag(tag);
    });

    articlePage.publishArticle();
  });

  it('should be edited using Edit button', function () {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    article.tagList.forEach((tag) => {
      articlePage.typeTag(tag);
    });

    articlePage.publishArticle();

    articlePage.clickOnEdit();

    cy.task('generateArticle').then((generateArticle) => {
      articlePage.typeTitle(generateArticle.title);
      articlePage.typeDescription(generateArticle.description);
      articlePage.typeBody(generateArticle.body);
      article.tagList.forEach((tag) => {
        articlePage.typeTag(tag);
      });
      articlePage.publishArticle();

      articlePage.visit(`#/articles/${article.title}`);
    });
  });

  it('should be deleted using Delete button', function () {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    article.tagList.forEach((tag) => {
      articlePage.typeTag(tag);
    });

    articlePage.publishArticle();

    articlePage.deleteArticle();

    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Do you really want to delete it?');
      return true;
    });
    articlePage.visit(`#/@${this.user.username}/`);

    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
