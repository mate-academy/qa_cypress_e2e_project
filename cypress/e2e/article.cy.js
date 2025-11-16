/// <reference types='cypress' />
/// <reference types='../support' />

import {
  faker
} from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.wrap(user).as('user');
    });
  });

  it('should be created using New Article form', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.visit();
      articlePage.typeArticleTitle(article.title);
      articlePage.typeArticleDescription(article.description);
      articlePage.typeArticleBody(article.body);
      articlePage.typeArticleTag(article.tag);
      articlePage.assertContainsPublishButton();
      articlePage.clickInPublishButton();
      articlePage.assertContainsArticleTitle(article.title);
      articlePage.assertContainsBody(article.body);
      articlePage.clickInProfileLink();
      articlePage.assertContainsDescription(article.description);
      articlePage.assertContainsTag(article.tag);
    });
  });

  it('should be edited using Edit button', () => {
    const editedArticle = {
      title: Math.random().toString().slice(2, 6),
      description: Math.random().toString().slice(2, 8),
      body: Math.random().toString().slice(2, 20),
      tag: faker.lorem.word()
    };

    cy.createArticle().then(() => {
      articlePage.clickInArticle();
      articlePage.clickInEditButton();
      articlePage.typeArticleTitle(editedArticle.title);
      articlePage.typeArticleDescription(editedArticle.description);
      articlePage.typeArticleBody(editedArticle.body);
      articlePage.typeArticleTag(editedArticle.tag);
      articlePage.clickInUpdateArticle();

      articlePage.assertContainsBody(editedArticle.body);
      articlePage.assertContainsArticleTitle(editedArticle.title);
      articlePage.clickInProfileLink();
      articlePage.assertContainsDescription(editedArticle.description);
      articlePage.assertContainsTag(editedArticle.tag);
    });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle();
    cy.get('@response').then((response) => {
      const slug = response.article.slug;
      articlePage.clickInArticle();
      articlePage.clickInDeleteButton().then(() => {
        cy.visit((`/article/${slug}`), {
          failOnStatusCode: false
        });
      });
    });
  });
});
