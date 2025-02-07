/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

const testData = {
  title: faker.lorem.words(),
  description: faker.lorem.words(),
  text: faker.lorem.sentence(),
  tag: faker.lorem.word()
};

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.registrationAndAuthorization();

    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.typeTitle(testData.title);
    articlePage.typeDespription(testData.description);
    articlePage.typeArticleText(testData.text);
    articlePage.typeTag(testData.tag);
    articlePage.clickPublishArticleButton();

    articlePage.assertUrlChanges();
  });

  it('should be edited using Edit button', () => {
    articlePage.createArticle();
    articlePage.clickEditButton();

    articlePage.typeNewTitle(testData.title);
    articlePage.clickPublishArticleButton();

    articlePage.assertTitleIsUpdated(testData.title);
  });

  it('should be deleted using Delete button', () => {
    articlePage.createArticle();
    articlePage.clickDeleteButton();

    articlePage.assertThereIsNoArticle();
  });
});
