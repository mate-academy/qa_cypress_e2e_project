/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

const testData = {
  newTitle: faker.lorem.word(),
  newDescription: faker.lorem.words(),
  newBody: faker.lorem.sentence(),
  newTag: faker.lorem.word()
}

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
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
    articlePage.tagField
      .type(article.tag);
    articlePage.articlePublishBtn
      .click();

    articlePage.checkArticleTitle
      .should('contain', article.title);
    articlePage.checkArticleBody
      .should('contain', article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.body, article.description, article.tag, article.title)
      .then((responce) => {
        const slug = responce.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });

    articlePage.articleEditBtn
      .first().click();
    articlePage.titleField
      .type('{selectAll}' + testData.newTitle);
    articlePage.descriptionField
      .type('{selectAll}' + testData.newDescription);
    articlePage.bodyField
      .type('{selectAll}' + testData.newBody);
    articlePage.tagField
      .type('{selectAll}' + testData.newTag);
    articlePage.articlePublishBtn
      .click();

    articlePage.checkArticleTitle
      .should('contain', testData.newTitle);
    articlePage.checkArticleBody
      .should('contain', testData.newBody);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.body, article.description, article.tag, article.title)
      .then((responce) => {
        const slug = responce.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });

    articlePage.articleDeleteBtn
      .first().click();
    
    homePage.checkArticleList
      .should('contain', 'No articles');
  });
})
