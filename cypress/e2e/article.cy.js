/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/ArticlePage';
import SignInPage from '../support/pages/SignInPage';
import { faker } from '@faker-js/faker';

describe('Article tests', () => {
  const articlePage = new ArticlePage();
  const signInPage = new SignInPage();
  const user = {
    email: 'testuser@example.com',
    password: 'Test@1234'
  };

  beforeEach(() => {
    cy.task('db:clear'); // czyszczenie bazy danych
    signInPage.visit();
    signInPage.signIn(user.email, user.password);
  });

  it('should create a new article', () => {
    const articleData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      tags: 'test,automation'
    };

    articlePage.visitNewArticleForm();
    articlePage.createArticle(articleData);
    articlePage.assertArticleCreated(articleData.title, articleData.body);
  });

  it('should edit an article', () => {
    const articleData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      tags: 'edit,test'
    };

    // tworzymy własny artykuł dla testu
    articlePage.visitNewArticleForm();
    articlePage.createArticle(articleData);

    const updatedData = { ...articleData, body: 'Updated body content' };
    articlePage.searchArticle(articleData.title);
    articlePage.editArticle(updatedData);
    articlePage.assertArticleUpdated(updatedData.body);
  });

  it('should delete an article', () => {
    const articleData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      tags: 'delete,test'
    };

    articlePage.visitNewArticleForm();
    articlePage.createArticle(articleData);

    articlePage.searchArticle(articleData.title);
    articlePage.deleteArticle();
    articlePage.assertArticleDeleted(articleData.title);
  });
});
