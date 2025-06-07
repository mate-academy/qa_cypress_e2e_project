/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlePageObject();

describe('Article Management', () => {
  before(() => {
    cy.task('db:clear'); // Clear database before running tests
    cy.login('testuser', 'TestPassword123'); // Assuming login method exists
    articlePage.visit();
  });

  beforeEach(() => {
    cy.reload(); // Refresh page to ensure clean state
  });

  it('should be created using New Article form', () => {
    const articleData = {
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };

    articlePage.createArticle(articleData);
    articlePage.assertArticleExists(articleData.title);
  });

  it('should be edited using Edit button', () => {
    // Create an article first
    const articleData = {
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };
    articlePage.createArticle(articleData);

    // Now edit the article
    const newTitle = faker.lorem.words(6);
    articlePage.editArticle(articleData.title, newTitle);
    articlePage.assertArticleUpdated(newTitle);
  });

  it('should be deleted using Delete button', () => {
    // Create an article first
    const articleData = {
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };
    articlePage.createArticle(articleData);

    // Now delete the article
    articlePage.deleteArticle(articleData.title);
    articlePage.assertArticleDeleted();
  });
});
