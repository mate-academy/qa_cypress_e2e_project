/// <reference types="cypress" />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
const faker = require('faker');

const articlePage = new ArticlePageObject();
const testArticle = {
  title: faker.lorem.sentence(),
  body: faker.lorem.sentence(5)
};

describe('Article page', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide to create new article', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.titleArticleField
      .type(article.title);
    articlePage.descriptionField
      .type(article.description);
    articlePage.bodyArticleField
      .type(article.body);
    articlePage.publishBtn
      .click();

    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-xs-12')
      .should('contain.text', article.body);
    cy.contains('a', 'Edit Article')
      .should('exist');
    cy.contains('.btn.btn-outline-danger.btn-sm', 'Delete Article')
      .should('exist');
  });

  it('should be edited article title using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.editBtn
      .click();
    articlePage.titleArticleField
      .clear()
      .type(testArticle.title);
    articlePage.publishBtn
      .click();
    cy.get('h1')
      .should('contain', testArticle.title);
  });
  it('should be edited article content using Edit button', () => {
    articlePage.visit();
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.editBtn
      .click();

    articlePage.bodyArticleField
      .clear()
      .type(testArticle.body);
    articlePage.publishBtn
      .click();
    cy.get('.col-xs-12')
      .should('contain', testArticle.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.deleteBtn
      .eq(0)
      .click();
    cy.visit('/');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
