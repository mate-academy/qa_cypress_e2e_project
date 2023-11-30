/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import YourFeedPageObject from '../support/pages/yourFeed.pageObject';
import faker from 'faker';

const articlePage = new ArticlePageObject();
const yourFeedPage = new YourFeedPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeDescriptionField(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    const newBody = faker.lorem.words();

    cy.createArticle(
      article.title,
      article.description,
      article.body
    ).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
    });

    articlePage.clickEditBtn();
    articlePage.updateArticleBody(newBody);
    articlePage.clickPublishBtn();
    articlePage.assertArticleBody(newBody);
  });

  it('should be deleted using Delete button', () => {
    const emptyYourFeed = 'No articles are here... yet.';

    cy.createArticle(
      article.title,
      article.description,
      article.body
    ).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
    });

    articlePage.clickDeleteBtn();
    yourFeedPage.clickMyArticlesPage();
    yourFeedPage.assertDeletedArticle(emptyYourFeed);
  });
});
