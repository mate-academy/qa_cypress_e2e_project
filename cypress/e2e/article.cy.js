/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import ArticlePageObject from "../support/pages/article.pageObject";

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  const articleTitle = faker.lorem.sentence();
  const articleDesc = faker.lorem.sentences(2);
  const articleBody = faker.lorem.sentences(5);
  const articleTag = faker.lorem.word();

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.register();
    cy.login();
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTitle(articleTitle);
    articlePage.typeArticleDesc(articleDesc);
    articlePage.typeArticleBody(articleBody);
    articlePage.typeArticleTags(articleTag);

    articlePage.clickPublishBtn();

    articlePage.verifyArticleCreation(articleTitle);
  });

  it('should be edited using Edit button', () => {
    articlePage.typeArticleTitle(articleTitle);
    articlePage.typeArticleDesc(articleDesc);
    articlePage.typeArticleBody(articleBody);
    articlePage.typeArticleTags(articleTag);

    articlePage.clickPublishBtn();

    articlePage.clickEditArticleBtn();

    articlePage.typeArticleTitle(articleTitle);
    articlePage.typeArticleDesc(articleDesc);
    articlePage.typeArticleBody(articleBody);

    articlePage.clickPublishBtn();

    articlePage.verifyArticleCreation(articleTitle);
  });

  it('should be deleted using Delete button', () => {
    articlePage.typeArticleTitle(articleTitle);
    articlePage.typeArticleDesc(articleDesc);
    articlePage.typeArticleBody(articleBody);
    articlePage.typeArticleTags(articleTag);

    articlePage.clickPublishBtn();

    articlePage.clickDeleteArticleBtn();

    articlePage.verifyDeletedArticle();
  });
});
