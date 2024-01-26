/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('User', () => {
  let user;
  let user2;
  let article;
  let articleSlug;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      return cy.createArticle(article);
    }).then((slug) => {
      articleSlug = slug;
    });
  });

  it('should be able to follow the another user', () => {
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
    cy.visit(`#/articles/${articleSlug}`);
    articlePage.clickOnTheFollowBtn();
    articlePage.assertFollowBtnName('Unfollow');
  });

  it('should be able to unfollow the another user', () => {
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
    cy.visit(`#/articles/${articleSlug}`);
    articlePage.clickOnTheFollowBtn();
    articlePage.clickOnTheUnfollowBtn();
    articlePage.assertUnfollowBtnName('Follow');
  });
});
