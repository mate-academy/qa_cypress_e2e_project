/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article tests', () => {
  let user;
  let title;
  let description;
  let body;

  beforeEach(() => {
    cy.task('db:clear');

    // Генерация пользователя
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });

    // Генерация случайных данных для статьи
    title = faker.lorem.words(5);
    description = faker.lorem.sentence();
    body = faker.lorem.paragraphs(2);

    cy.visit('/');
  });

  it('should create a new article', () => {
    articlePage.visitNewArticle();
    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.publishArticle();
    articlePage.assertArticleExists(title);
  });

  it('should edit an article', () => {
    cy.createArticle(title, description, body);

    const newTitle = faker.lorem.words(5);

    articlePage.editArticle();
    articlePage.typeTitle(newTitle);
    articlePage.publishArticle();
    articlePage.assertArticleExists(newTitle);
  });

  it('should delete an article', () => {
    cy.createArticle(title, description, body);
    articlePage.deleteArticle();
    articlePage.assertArticleNotExists(title);
  });
});
